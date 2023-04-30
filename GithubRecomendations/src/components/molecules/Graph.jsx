import { useEffect, useState } from 'react'
import githubIcon from '../../assets/github.svg'
import '../../App.css'
import Text from '../atoms/Text'

function Graph() {
    const [rerender, setRerender] = useState(false);
    
    async function getFriendsofFriends(){
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
        .then(data => {console.log(data)});
    }

    useEffect(() => {
        getFriendsofFriends();
    }, []);

    return (
        <Text size='2em;'>Aqui tem um grafo</Text>
    )
}

export default Graph