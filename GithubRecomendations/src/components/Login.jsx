import { useState } from 'react'
import '../App.css'
import Text from './Atoms/Text'


function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <Text
                font-size='20px'
            >
                Login with github
            </Text>
        </div>
    )
}

export default App
