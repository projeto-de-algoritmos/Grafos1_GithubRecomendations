import { useState } from 'react'
import '../../App.css'
import OutlineCard from '../atoms/OutlineCard'
import Text from '../atoms/Text'
import GlitchedText from '../atoms/GlitchedText'
import Graph from '../molecules/Graph'
import githubIcon from '../../assets/github.svg'


function App() {
    const [rerender, setRerender] = useState(false);

    const handleClick = () => {
        localStorage.removeItem('access_token');
        window.location.replace('/');
    }


    return (
        <OutlineCard
            background-color='white'
            height='70dvh'
            width='fit-content'
            padding='clamp(1em, 2vw ,2em)'
        >
            <GlitchedText className="glitchedText">FOLLOW RECOMENDATIONS</GlitchedText>
            <Graph />
            <Text
                size='1.5em'
                margin='0 2em 1em 2em'
            >
                Clique para deslogar
            </Text>
            <a className="logoff-button" onClick={() => handleClick()}>
                <Text size='2em;'>Logoff</Text>
                <img src={githubIcon} className="logo github" alt="Github logo" />
            </a>
        </OutlineCard>
    )
}

export default App
