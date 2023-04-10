import { useState } from 'react'
import githubIcon from '../../assets/github.svg'
import '../../App.css'
import Text from '../atoms/Text'


function getGitHubUrl() {
    const rootURl = 'https://github.com/login/oauth/authorize';
  
    const options = {
      client_id: process.env.GITGUB_CLIENT_ID,
      redirect_uri: 'http://localhost:5173/',
      scope: 'user:email',
      state: 'http://localhost:5173/',
    };
  
    const qs = new URLSearchParams(options);
  
    return `${rootURl}?${qs.toString()}`;
}  

function GithubLogin() {
    const [count, setCount] = useState(0)

    return (
        <a className="login-button">
            <Text size='2em;'>Login with Github</Text>
            <img src={githubIcon} className="logo github" alt="Github logo" />
        </a>
    )
}

export default GithubLogin
