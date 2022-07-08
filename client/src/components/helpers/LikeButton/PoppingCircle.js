import styled, { keyframes } from "styled-components";

const PoppingCircle = ({size,color}) => {

    return (
            <Wrapper style={{width: size, height: size, backgroundColor: color, borderRadius: "50%"}}></Wrapper>
    )
}

const scale = keyframes`
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
`

const fade = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 0;
    }
`

const Wrapper = styled.div`
    position: absolute;
    animation: ${scale} 300ms forwards, ${fade} 500ms forwards;
`

export default PoppingCircle;