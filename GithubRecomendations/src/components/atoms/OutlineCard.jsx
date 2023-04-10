import styled from "styled-components";


const OutlineCard = styled.span.attrs(
  props => ({
    size: props.size,
    shadow: props.shadow,
    margin: props.margin,
    padding: props.padding,
    height: props.height,
    width: props.width,
  })
)`
background-color: ${({ color }) => color};
margin: ${({ margin }) => margin};
padding: ${({ padding }) => padding};
height: ${({ height }) => height};
width: ${({ width }) => width};
border: 1px solid white;
border-radius: 12px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`

export default OutlineCard;