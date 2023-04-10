import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/organisms/Login'


function App() {
  const [count, setCount] = useState(0)
  const [position, setPosition] = useState({ x: 0, y:0});

  return (
    <div className="App">
      <span className="blob" onMouseMove={(e) => setPosition({x: e.clientX, y: e.clientY })}
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
        }}
      />
      <Login/>
    </div>
  )
}

export default App
