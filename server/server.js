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
app.options('*',cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get('/getAccessToken', async function (req, res) {
    const code = req.query.code;
    const rootURl = 'https://github.com/login/oauth/access_token';

    const options = {
        code: code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      };

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    const qs = new URLSearchParams(options);
  
    const fullURL = `${rootURl}?${qs.toString()}`;
    console.log(fullURL)

    await fetch(fullURL, {
        mode: 'cors',
        method: 'POST',
        headers: headers,
    })
    .then(response => {return response.json()})
    .then(data => res.json(data));
});

app.get('/getUserData', async function (req, res) {
    req.get("Authorization");
    await fetch('https://api.github.com/user', {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': req.get("Authorization"),
        }})
    .then(response => {return response.json()})
    .then(data => res.json(data));
}); 

app.get('/getFriendsofFriendsGraph', async function (req, res) {

    const graph = {
        nodes: [{id: 'user', label: 'User'}],
        edges: [],
    };

    const friends = [];
    req.get("Authorization");
    await fetch('https://api.github.com/user/following', {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github+json',
            'Authorization': req.get("Authorization"),
            'X-GitHub-Api-Version': '2022-11-28',
        }})
    .then(response => {return response.json()})
    .then(data => {friends.push(data.map(item => item.login))});

    friends[0].forEach(friend => {
        graph.nodes.push({id: friend, label: friend});
        graph.edges.push({from: 'user', to: friend});
    });
    
    for (let i = 0; i < friends[0].length; i++) {
        await fetch('https://api.github.com/users/' + friends[0][i] + '/followers', {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github+json',
            'Authorization': req.get("Authorization"),
            'X-GitHub-Api-Version': '2022-11-28',
        }})
        .then(response => {return response.json()})
        .then(data => data.map(item => item.login).forEach(friend => {
            if (!graph.nodes.find(node => node.id === friend)){
                graph.nodes.push({id: friend, label: friend});
                graph.edges.push({from: friend, to: friends[0][i]});
            }
            else{
                graph.edges.push({from: friend, to: friends[0][i]});
            }
        }));
    }

    res.send(graph);
});



app.listen(8000, () => console.log('Server started on port 8000'));