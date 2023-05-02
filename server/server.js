var express = require('express');
var cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();
var bodyParser = require('body-parser');
const CLIENT_ID = process.env.GITGUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_SECRET;

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.options('*', cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


async function getUserData(req) {
    const response = await fetch('https://api.github.com/user', {
        mode: 'cors', method: 'GET', headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': req.get("Authorization"),
        }
    });
    const data = await response.json();
    return data;
}

function customScoring(yourFriendsSet, friend, friendOfFriendLogin) {
    const yourCommonFriends = new Set([...yourFriendsSet].filter(x => friend.adjacent.includes(x)));

    // Since we don't have the friends of friends adjacency list, we cannot calculate the common friends with your friend
    // We can only calculate the points based on the common friends between you and the friend of a friend
    const yourCommonFriendsPoints = yourCommonFriends.size * 2;

    return yourCommonFriendsPoints;
}

function recommendFriends(adjacencyList) {
    const yourFriendsSet = new Set(adjacencyList[0].adjacent);
    const recommendations = new Map();

    adjacencyList.slice(1).forEach(friend => {
        friend.adjacent.forEach(friendOfFriendLogin => {
            if (!yourFriendsSet.has(friendOfFriendLogin) && adjacencyList[0].login !== friendOfFriendLogin) {
                const score = customScoring(yourFriendsSet, friend, friendOfFriendLogin);

                if (recommendations.has(friendOfFriendLogin)) {
                    recommendations.set(friendOfFriendLogin, {
                        score: Math.max(score, recommendations.get(friendOfFriendLogin).score),
                        connections: recommendations.get(friendOfFriendLogin).connections + 1
                    });
                } else {
                    recommendations.set(friendOfFriendLogin, {
                        score, connections: 1
                    });
                }
            }
        });
    });

    const sortedRecommendations = [...recommendations.entries()].sort((a, b) => {
        if (b[1].score === a[1].score) {
            return b[1].connections - a[1].connections;
        } else {
            return b[1].score - a[1].score;
        }
    });

    return sortedRecommendations.map(([friendLogin, {
        score, connections
    }]) => ({login: friendLogin, score, connections}));
}


app.get('/getAccessToken', async function (req, res) {
    const code = req.query.code;
    const rootURl = 'https://github.com/login/oauth/access_token';

    const options = {
        code: code, client_id: CLIENT_ID, client_secret: CLIENT_SECRET,
    };

    const headers = {
        'Content-Type': 'application/json', 'Accept': 'application/json',
    };

    const qs = new URLSearchParams(options);

    const fullURL = `${rootURl}?${qs.toString()}`;
    console.log(fullURL)

    await fetch(fullURL, {
        mode: 'cors', method: 'POST', headers: headers,
    })
        .then(response => {
            return response.json()
        })
        .then(data => res.json(data));
});

app.get('/getFriendsofFriendsGraph', async function (req, res) {

    console.log('request received')

    const user = await getUserData(req); //gets user data
    const items = [];

    const graph = { //graph object
        nodes: [],
        edges: [],
    };

    graph.nodes.push({id: user.login, label: user.login});  // adds user to graph

    const friends = [];
    req.get("Authorization");
    await fetch('https://api.github.com/user/following', {
        mode: 'cors', method: 'GET', headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github+json',
            'Authorization': req.get("Authorization"),
            'X-GitHub-Api-Version': '2022-11-28',
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.'); // if response is not ok, throws error
        })
        .then(data => {
            if (Array.isArray(data)) {
                data.map(item => item).forEach(friend => {
                    graph.nodes.push({id: friend.login, label: friend.login});  // adds nodes to graph
                    graph.edges.push({from: user.login, to: friend.login});     // adds edges to graph

                    friends.push(data.map(item => item))
                });
            } else {
                console.log('data is not an array or is undefined');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });


    user.adjacent = friends[0].map(item => item.login); //adds friends to user adj list
    friends[0].forEach(item => item.adjacent = [user.login]); //adds user to friends adj list
    items.push(user, ...friends[0]); //adds user and friends to items list

    for (let i = 0; i < friends[0].length; i++) {
        await fetch('https://api.github.com/users/' + friends[0][i].login + '/followers', {
            mode: 'cors', method: 'GET', headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github+json',
                'Authorization': req.get("Authorization"),
                'X-GitHub-Api-Version': '2022-11-28',
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (Array.isArray(data)) {
                    data.map(item => item).forEach(fof => {
                        if (!graph.nodes.find(node => node.id === fof.login)) {
                            graph.nodes.push({id: fof.login, label: fof.login}); //adds node to graph
                            graph.edges.push({from: fof.login, to: friends[0][i].login}); //adds edge to graph
                        }
                        else{
                            graph.edges.push({from: fof.login, to: friends[0][i].login}); //adds edge to graph
                        }

                        friends[0][i].adjacent.push(fof.login);
                    });
                } else {
                    console.log('data is not an array or is undefined');
                }
            });
    }
    // console.log(items)
    // items.shift();
    // console.log(items)
    console.log(graph)

    const friendRecommendations = recommendFriends(items);
    console.log(friendRecommendations)

    const responseItems = {
        graph: graph,
        friendRecommendations: friendRecommendations,
    }

    res.send(responseItems);
});


app.listen(8000, () => console.log('Server started on port 8000'));