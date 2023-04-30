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
    .then(data => {
        console.log(data)
        res.json(data)});
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


app.listen(8000, () => console.log('Server started on port 8000'));