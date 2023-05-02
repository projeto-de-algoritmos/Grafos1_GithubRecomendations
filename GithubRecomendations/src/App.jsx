import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/organisms/Login";
import FriendsOfFriends from "./components/organisms/FrindsOfFriends";

function App() {
  const [count, setCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [UserData, setUserData] = useState(null);

  useEffect(() => {
    // Animation for the background blob
    function handleMouseMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }

    document.addEventListener("mousemove", handleMouseMove);

    const blob = document.getElementsByClassName("blob")[0];

    window.onpointermove = (event) => {
      const { clientX, clientY } = event;

      blob.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 3000, fill: "forwards" }
      );
    };

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  async function getUserData(){
    await fetch("http://localhost:8000/getUserData",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
    })
    .then(response => {return response.json()})
    .then(data => {
        console.log(data);
    });
}

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setAccessToken(storedToken);
      setIsLoggedIn(true);
      //getUserData()
    }
  }, [accessToken]);

  return (
    <div className="App">
      <div className="background">
        <span
          className="blob"
          style={{
            position: "absolute",
            top: position.y,
            left: position.x,
          }}
        />
        <div className="blur" />
      </div>
      <div className="content">
        {isLoggedIn ? (
          <FriendsOfFriends /> //logged
        ) : (
          <Login /> //not logged
        )}
      </div>
    </div>
  );
}

export default App;
