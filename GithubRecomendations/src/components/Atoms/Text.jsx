import styled from "styled-components";


const Text = styled.span.attrs(
  props => ({
    weight: props.weight ? 'regular' | 'semibold' | 'bold' : 'regular',
    color: props.color,
    size: props.size,
    shadow: props.shadow,
    margin: props.margin,
  })
)`
width: fit-content;
font-size: ${({ size }) => size || '18px'};
font-weight: ${({ weight }) => weight === 'semibold' ? '600' : weight};
color: ${({ color }) => color};
margin: ${({ margin }) => margin};
text-shadow: ${({ shadow }) => shadow};
`

export default Text;