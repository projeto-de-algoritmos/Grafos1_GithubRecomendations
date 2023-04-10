import { useState, useEffect, useRef } from 'react'
import styled from "styled-components";

function TextArea({ className, children }) {

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const glitched = document.getElementsByClassName('glitchedText')[0];

    var iteration = 0;

    useEffect(() => {
        let interval = null;

        document.querySelector("h1").onmouseover = event => {

            clearInterval(interval);



            interval = setInterval(() => {
                event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return 'FOLLOW RECOMENDATIONS'[index];
                        }

                        return letters[Math.floor(Math.random() * 26)]
                    })
                    .join("");

                if (iteration >= event.target.innerText.length) {
                    clearInterval(interval);
                    iteration = 0;
                }

                iteration += 1 / 5;
            }, 30);


        }

    }, []);

    return (
        <h1 className={className}>{children}</h1>
    )
}


const GlitchedText = styled(TextArea).attrs(
    props => ({
        color: props.color,
        size: props.size,
        shadow: props.shadow,
        margin: props.margin,
    })
)`
width: fit-content;
font-size: ${({ size }) => size || '5em'};
font-weight: '1000';
font-family: 'Space Mono', monospace;
white-space: nowrap;
color: ${({ color }) => color};
margin: ${({ margin }) => margin};
text-shadow: ${({ shadow }) => shadow};
`

export default GlitchedText;