var express = require('express');
var cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();
var bodyParser = require('body-parser');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async (req, res) => {
    const code = req.query.code;
    const rootURl = 'https://github.com/login/oauth/access_token';

    const options = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: 'http://localhost:5173/',
        code: code,
      };
    
    const body = JSON.stringify(options);
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        'Access-Control-Allow-Credentials': 'true',
    };

    await fetch(rootURl, {
        mode: 'cors',
        method: 'POST',
        headers: headers,
        body: body,
    })
    .then(response => response.json())
    .then(data => res.json(data));
});

app.get('/getUserData', async (req, res) => {
    req.get("Authorization");
    await fetch('https://api.github.com/user', {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Authorization': req.get("Authorization"),
        }})
    .then(response => response.json())
    .then(data => res.json(data));
}); 


app.listen(5000, () => console.log('Server started on port 5000'));