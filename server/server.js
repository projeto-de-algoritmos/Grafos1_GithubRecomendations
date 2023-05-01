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


async function getUserData(req) {
    const response = await fetch('https://api.github.com/user', {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': req.get("Authorization"),
        }
    });
    const data = await response.json();
    return data;
}


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

app.get('/getFriendsofFriendsGraph', async function (req, res) {

    const user = await getUserData(req); //gets user data
    const items = [];

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
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error('Network response was not ok.'); // if response is not ok, throws error
    }) 
    .then(data => {
        if (Array.isArray(data)) {
          data.map(item => item).forEach(friend => {
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
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github+json',
            'Authorization': req.get("Authorization"),
            'X-GitHub-Api-Version': '2022-11-28',
        }})
        .then(response => {return response.json()})
        .then(data => {
            if (Array.isArray(data)) {
              data.map(item => item).forEach(friend => {
                friends[0][i].adjacent.push(friend.login);
              });
            } else {
              console.log('data is not an array or is undefined');
            }
          });
    }
    // console.log(items)

    res.send(items);
});



app.listen(8000, () => console.log('Server started on port 8000'));