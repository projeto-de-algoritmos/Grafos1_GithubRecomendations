import {useState} from 'react'
import '../../App.css'
import OutlineCard from '../atoms/OutlineCard'
import Text from '../atoms/Text'
import GlitchedText from '../atoms/GlitchedText'
import Graph from '../molecules/Graph'
import githubIcon from '../../assets/github.svg'
import FriendRecommendation from '../molecules/FriendRecommendation'


function FriendsOfFriends() {
    const [rerender, setRerender] = useState(false);
    const [FOF, setFOF] = useState(null);

    const handleClick = () => {
        localStorage.removeItem('access_token');
        window.location.replace('/');
    }

    async function getFriendsofFriendsGraph(){
        await fetch("http://localhost:8000/getFriendsofFriendsGraph",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Allow-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(response => {return response.json()})
        .then(data => {
            console.log(data);
            setFOF(data);
        });
    }

    useState(() => {
        getFriendsofFriendsGraph()
    }, [FOF]);

    return (
        <>
        {FOF ? (
            <><h1 className="glitchedText">FOLLOW
                    RECOMENDATIONS
                </h1><div>
                        <OutlineCard
                            background-color='white'
                            height='fit-content'
                            width='fit-content'
                        >
                            <Graph graph={FOF.graph} />

                        </OutlineCard>

                        <a className="logoff-button" onClick={() => handleClick()}>
                            <Text size='2em;'>Logoff</Text>
                            <img src={githubIcon} className="logo github"
                                alt="Github logo" />
                        </a>
                    </div>
                {
                    <FriendRecommendation friendRecommendations={FOF.friendRecommendations} />
                }
            </>
            ) : (<div className="App"></div>)}
        </>
    )
}

export default FriendsOfFriends