import styled from "styled-components";

const Homepage = () => {
    return (
        <Wrapper>
            <Home>
            <h1><span>Homepage</span></h1>
            </Home>
            <TweetSection>
                <TweetHere>
                    <ProfileImage/>
                    <TweetArea/>            
                </TweetHere>
                <TweetButton/>                   
            </TweetSection>
             <FeedSection>

             </FeedSection>
        </Wrapper>
    
    );
}

const Wrapper = styled.div``

const Home = styled.div`
    position: fixed;
    left: 300px;
    
`
const TweetSection = styled.div``
const TweetHere = styled.div``

const ProfileImage = styled.img``

const TweetArea = styled.textarea``
const TweetButton = styled.button``

const FeedSection = styled.div``

export default Homepage;