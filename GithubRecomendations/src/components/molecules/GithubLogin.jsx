import { useEffect, useState } from 'react'
import githubIcon from '../../assets/github.svg'
import '../../App.css'
import Text from '../atoms/Text'

const client_id = import.meta.env.VITE_GITGUB_CLIENT_ID;
const client_secret = import.meta.env.VITE_GITGUB_CLIENT_SECRET;

function getGitHubUrl() {
    const rootURl = 'https://github.com/login/oauth/authorize';
  
    const options = {
      client_id: client_id,
      redirect_uri: 'http://localhost:5173/',
      scope: 'user:email',
      state: 'http://localhost:5173/',
    };
  
    const qs = new URLSearchParams(options);
  
    return `${rootURl}?${qs.toString()}`;
}

async function getUserData(){
    await fetch("https://api.github.com/user",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
    })
    .then(response => {return response.json()})
    .then(data => {
        console.log(data);
    });
}

function GithubLogin() {
    const [count, setCount] = useState(0)
    const [rerender, setRerender] = useState(false);

    const handleClick = () => {
        const githubUrl = getGitHubUrl();
        window.location.href = githubUrl;
    }

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get('code');

        if (code && (localStorage.getItem('access_token') === null)) {
            async function getAccessToken () {
                await fetch("http://localhost:5000/getAccessToken?code=" + code,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Allow-Control-Allow-Origin': '*',
                    },
                })
                .then(response => {return response.json()})
                .then(data => {
                    console.log(data);
                    if(data.access_token){
                        localStorage.setItem('access_token', data.access_token);
                        console.log('token salvo = ' + data.access_token)
                        setRerender(!rerender);
                    }
                });
            }
            getAccessToken();
        }
        
        // console.log('token = ' + localStorage.getItem('access_token'));
        // console.log('code = ' + code);
        // localStorage.removeItem('access_token');
         getUserData();
    }, []);

    return (
        <a className="login-button" onClick={() => handleClick()}>
            <Text size='2em;'>Login with Github</Text>
            <img src={githubIcon} className="logo github" alt="Github logo" />
        </a>
    )
}

export default GithubLogin