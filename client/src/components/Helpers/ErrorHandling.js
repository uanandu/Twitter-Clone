import styled from "styled-components";
import { Icon } from 'react-icons-kit';
import { u1F4A3 as bomb } from 'react-icons-kit/noto_emoji_regular/u1F4A3';

export const ErrorHandling = () => {
    return (
        <ErrorWrapper>
            <Icon icon={bomb}  size={130} style={{marginLeft: "250px"}}/>
            <div>
                <h1>An Error has occured</h1>
                <p>Please refresh the page 🐣, or 
                    <a href="/" style={{color: "blue"}}> go back to the home page</a>
                </p>
                <p>If the issue still persists, please 
                    <a href="/" style={{color: "blue"}}> contact us</a>
                </p>
            </div>
        </ErrorWrapper>
    )
}

const ErrorWrapper = styled.div`
    margin-left: 350px;
    position: relative;
    top: 15vh;
    left: 200px;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    font-size: 2rem;
`