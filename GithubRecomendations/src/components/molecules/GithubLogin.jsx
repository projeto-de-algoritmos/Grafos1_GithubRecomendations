import { useState } from 'react'
import githubIcon from '../../assets/github.svg'
import '../../App.css'
import Text from '../atoms/Text'


function getGitHubUrl() {
    console.log(import.meta.env.VITE_GITGUB_CLIENT_ID)
    const client_id = import.meta.env.VITE_GITGUB_CLIENT_ID;

    console.log(client_id)
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
    const [count, setCount] = useState(0)

    const handleClick = () => {
        const githubUrl = getGitHubUrl();
        window.location.href = githubUrl;
    }

    return (
        <a className="login-button" onClick={() => handleClick()}>
            <Text size='2em;'>Login with Github</Text>
            <img src={githubIcon} className="logo github" alt="Github logo" />
        </a>
    )
}

export default GithubLogin