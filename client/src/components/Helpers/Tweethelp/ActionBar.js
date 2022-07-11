import styled from "styled-components"; // styled components
import { useContext } from "react"; // useContext for the context

import { TweetContext } from "../../Contexts/TweetContext"; // get the context of the Tweet

import LikeButton from "../Tweethelp/LikeButton/index"; // get the like button
import Action from "./Action"; 
import TweetActionIcon from "./TweetActionIcon";

const ActionBar = ( { isLiked, tweetID }) => {

  //Prop Info//
  //========//
  // isLiked is a boolean which is from tweet.isLiked, from: TweetWrapper component
  // tweetID is the id of the tweet, from: TweetWrapper component 

  //Prop Check//
  //==========//
  // console.log("inside ActionBar", isLiked)
  // console.log("inside ActionBar",tweetID)

  // These are contexts from the TweetContext
  // Context information//
  //===================//
  // handleTweetLike is a function which takes 'tweet-id' and event as props,
  // handleToggleRetweet is a function which takes 'tweet-id' and event as props,
  // isRetweetedByCurrentUser is an array that contains the ids of the tweets that are retweeted by us,  
  const {handleToggleLike, handleToggleRetweet, isRetweetedByCurrentUser} = useContext(TweetContext);

  // For the other buttons that aren't set
  const handleNotSet = (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    alert("Functionality not yet implemented 😞. We apologize for the inconvenience .Please check back later!");
  }

  let isRetweeted = false; // for setting the retweet number

  // compares the array of retweets to the current user's id and 
  // if the current user's id is in the array, then set isRetweeted to true
  Array.from(isRetweetedByCurrentUser).forEach((IDtoCompare)=> {
      if (IDtoCompare === tweetID) { // tweetID is a prop from TweetWrapper component
        isRetweeted = true;
      }
    })

  return (
    <Wrapper>
      <Action color="rgb(27, 149, 224)" size={40} onClickFunc={(e)=> {handleNotSet(e)}}>
        <TweetActionIcon kind="reply" />
      </Action>
      <Action 
        color="rgb(23, 191, 99)" 
        size={40}           
        onClickFunc={(e)=>handleToggleRetweet(e, tweetID)}
      >
        { isRetweeted ? (
          <RetweetWrap>
            <TweetActionIcon
          kind="retweet"
          color="rgb(23, 191, 99)"
          />
          <RetweetedNumber>1</RetweetedNumber>
          </RetweetWrap>
        ) : (
            <TweetActionIcon
          kind="retweet"
          color="undefined"
        />
        )}
      </Action>
      <Action 
        color="rgb(224, 36, 94)" 
        size={40}
        onClickFunc={(e)=>handleToggleLike(e, tweetID)}  
      >
        <LikeButton 
          isLiked={isLiked}
          tweetId={tweetID}
        />
      </Action>
      <Action color="rgb(27, 149, 224)" size={40} onClickFunc={(e)=> {handleNotSet(e)}}>
        <TweetActionIcon kind="share" />
      </Action>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 40px;
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px solid rgb(230, 230, 230);
`;

const RetweetWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const RetweetedNumber = styled.p`
  position: absolute;
  margin-left: 60px;
  font-size: 20px;
`

export default ActionBar;
