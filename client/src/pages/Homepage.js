import styled from "styled-components";
import { useState } from "react";
import Feed from "./Feed";
import Tweet from "./Tweet";

const Homepage = () => {

    const [count, setCount] = useState(280);

    const recalculate = (e) => {
        let value = e.target.value;
        setCount(count - value);
    }

    return (
        <Wrapper>
            <Home>
                <HomeText>Homepage</HomeText>
                <TweetSection>                        
                    <ProfileImage src="https://c.tenor.com/gnof6FIxlYcAAAAj/amogus.gif" />
                    <Tweetform>
                        <TweetInput placeholder="What's happening?" onChange={()=> recalculate}/>
                        <CountText>{count}</CountText>
                        <TweetButton type="submit" >Tweet</TweetButton>
                    </Tweetform>
                </TweetSection>            
            </Home>
            <Divider />
            <MyTweet>
                <Tweet/>
            </MyTweet>
            <Divider />
             <FeedSection>
                <Feed/>
             </FeedSection>
        </Wrapper>
    
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 70vw;
    background-color: antiquewhite;
    margin-left: 250px;
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
`

const Home = styled.div`
    left: 300px;
    
`
const HomeText = styled.div`
    font-size: 30px;
    font-weight: bold;
    padding: 10px;
    border-bottom: 1px solid black;
    margin-bottom: 10px;
`

const TweetSection = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
`

const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`

const Tweetform = styled.form`
    display: flex;
    align-items: flex-end;
`

const TweetInput = styled.input`
    margin: 10px;
    width: 50vh;
    height: 10vh;
    border: none;
`
const CountText = styled.div``

const TweetButton = styled.button`
    background-color: #1da1f2;
    width: 8vh;
    height: 30px;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 5px;   
    margin-left: 10px;
    margin-top: 10px;
    cursor: pointer;
`

const MyTweet = styled.div`
    margin: 30px 10px 0px 10px;
`

const FeedSection = styled.div`
    margin: 30px 10px 0px 10px;
`

const Divider = styled.div`
    margin-top: 10px;
  height: 5px;
  background: lightgray;
`;

export default Homepage;