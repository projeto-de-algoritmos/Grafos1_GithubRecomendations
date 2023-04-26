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
            async function getAccessToken() {
                await fetch("https://localhost:5173/getAccessToken?code=" + code,{
                    method: 'GET',
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if(data.access_token){
                        localStorage.setItem('access_token', data.access_token);
                        setRerender(!rerender);
                    }
                })
            }
        }
            
    }, []);

    return (
        <a className="login-button" onClick={() => handleClick()}>
            <Text size='2em;'>Login with Github</Text>
            <img src={githubIcon} className="logo github" alt="Github logo" />
        </a>
    )
}

export default GithubLogin