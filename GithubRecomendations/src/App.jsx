import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/organisms/Login'


function App() {
  const [count, setCount] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }

    document.addEventListener('mousemove', handleMouseMove);

    const blob = document.getElementsByClassName('blob')[0];

    window.onpointermove = event => { 
      const { clientX, clientY } = event;
      
      blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
      }, { duration: 3000, fill: "forwards" });
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
    
  return (
    <div className="App">
      <div className="background">
        <span className="blob"
          style={{
            position: 'absolute',
            top: position.y,
            left: position.x,
          }}
        />
        <div className='blur'/>
      </div>
      <div className='content'>
        <Login/>
      </div>
    </div>
  )
}

export default App
