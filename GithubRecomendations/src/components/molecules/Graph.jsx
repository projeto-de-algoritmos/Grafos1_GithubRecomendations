import { useEffect, useState, useRef } from 'react'
import githubIcon from '../../assets/github.svg'
import '../../App.css'
import Text from '../atoms/Text'
import 'vis-network/dist/dist/vis-network.min.css';
import { Network } from 'vis-network';

function Graph() {
    const networkRef = useRef(null);
    const [graph, setGraph] = useState(null);
    
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
            console.log(data.graph);
            setGraph(data.graph);
        });
    }

    useEffect(() => {
        getFriendsofFriendsGraph()
    }, []);

    useEffect(() => {
        if (graph && networkRef.current) {
            var options = {
                nodes: {
                  shape: "dot",
                  size: 16,
                },
                physics: {
                  forceAtlas2Based: {
                    gravitationalConstant: -26,
                    centralGravity: 0.005,
                    springLength: 230,
                    springConstant: 0.18,
                  },
                  maxVelocity: 146,
                  solver: "forceAtlas2Based",
                  timestep: 0.35,
                  stabilization: { iterations: 150 },
                },
            };

            const network = new Network(networkRef.current, graph, options);
        }
    }, [graph]);

    return <div ref={networkRef} style={{ height: '500px' }} />
}

export default Graph