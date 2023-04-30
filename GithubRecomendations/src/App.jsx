import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/organisms/Login'


function App() {
  const [count, setCount] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Animation for the background blob
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

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setAccessToken(storedToken);
      setIsLoggedIn(true);
    }
  }, [accessToken]);
    
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
        {isLoggedIn ? (<h1>TESTE</h1>) : (<Login/>)}    
      </div>
    </div>
  )
}

export default App
