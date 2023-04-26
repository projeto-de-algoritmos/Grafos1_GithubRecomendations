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

async function getAccessToken(code) {
    await fetch("http://localhost:5000/getAccessToken?code=" + code,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Allow-Control-Allow-Origin': '*',
        },
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
}

function GithubLogin() {
    const [rerender, setRerender] = useState(false)
    const [count, setCount] = useState(0)

    const handleClick = () => {
        const githubUrl = getGitHubUrl();
        window.location.href = githubUrl;
    }

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get('code');

        if (code && (localStorage.getItem('access_token') === null)) {
            const response = getAccessToken(code);
            if(response.access_token){
                console.log('token = ' + response.access_token)
                localStorage.setItem('access_token', response.access_token);
                setRerender(!rerender);
            }
        }
        // teste para verificar se o token está sendo salvo no local storage
        //else if(localStorage.getItem('access_token') !== null){
        //    console.log('token = ' + localStorage.getItem('access_token'));
        //    setRerender(!rerender);
        //}
            
    }, []);

    return (
        <a className="login-button" onClick={() => handleClick()}>
            <Text size='2em;'>Login with Github</Text>
            <img src={githubIcon} className="logo github" alt="Github logo" />
        </a>
    )
}

export default GithubLogin