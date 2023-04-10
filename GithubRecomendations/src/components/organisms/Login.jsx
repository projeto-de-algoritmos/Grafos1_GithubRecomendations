import { useState } from 'react'
import '../../App.css'
import GithubLogin from '../molecules/GithubLogin'
import OutlineCard from '../atoms/OutlineCard'
import Text from '../atoms/Text'
import GlitchedText from '../atoms/GlitchedText'


function App() {
    const [count, setCount] = useState(0)

    return (
        <OutlineCard
            background-color='white'
            height='70dvh'
            width='fit-content'
            padding='clamp(1em, 2vw ,2em)'
        >
            <GlitchedText className="glitchedText">FOLLOW RECOMENDATIONS</GlitchedText>
            <Text
                size='1.5em'
                margin='0 2em 1em 2em'
            >
                Para usar a aplicação, é necessário o Login para a conta github
            </Text>
            <GithubLogin />
        </OutlineCard>
    )
}

export default App
