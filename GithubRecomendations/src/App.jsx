import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/organisms/Login'


function App() {
  const [count, setCount] = useState(0)

  const blob = document.querySelector('.blob')

  document.body.onpointermove = event => {
    const { clientX, clientY } = event;

    blob.style.left `${clientX}px`;
    blob.style.top `${clientY}px`;
  }

  return (
    <div className="App">
      {/*<span className="blob" />*/}
      <Login/>
    </div>
  )
}

export default App
