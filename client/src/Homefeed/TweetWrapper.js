import { useHistory } from "react-router-dom"; // for locating a tweet
import styled from "styled-components"; // for styling

import Header from "../components/Helpers/Tweethelp/Header"; // for the header component of tweet
import ActionBar from "../components/Helpers/Tweethelp/ActionBar"; // for the action bar with all the buttons

export const TweetWrapper = ({ tweet }) => {
  // console.log("this is inside tweet container", tweet.isLiked);

  //   console.log("time stamp here",tweet.timeStamp)
  // console.log("Inside TweetWrapper",tweet.isLiked) // initial value is false (from api call)
  // let's capture the tweet id

  let tweetId = tweet.id;

  // useHistory is used to navigate to the tweet page
  const history = useHistory();

  const handleViewTweet = (e) => {
    //event fired when tweeter details open clicked
    e.preventDefault();
    e.stopPropagation();
    history.push({
      pathname: `/tweet/${tweetId}`,
      state: { tweetID: tweetId },
    });
  };

  return (
    <>
      <Wrapper
        onClick={(e) => {
          handleViewTweet(e);
        }}
        tabIndex="0"
        aria-label="view tweet"
      >
        {/* { Here, we check if this is retweeted or not*/}
        <Header tweet={tweet} />
        <TweetContents>
          <TweetStatus>{tweet.status}</TweetStatus>
          {tweet.media.length > 0 && (
            <img
              style={{ maxWidth: "800px" }}
              src={tweet.media[0].url}
              alt="tweet media"
            /> // display media
          )}
        </TweetContents>
        <Timestamp>{tweet.timeStamp}</Timestamp>
        {/* this tweetID is for this specific tweet(whichever one) */}
        <ActionBar tweetID={tweet.id} isLiked={tweet.isLiked} />
      </Wrapper>
    </>
  );
};

// styled component

const Wrapper = styled.div`
  background: white;
  width: 868px;
  padding: 16px;
  text-align: left;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
  border-right: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
`;

const TweetContents = styled.div`
  font-size: 22px;
  padding: 10px;
`;

const TweetStatus = styled.div`
  margin: 10px 0 10px 0;
`;

const Timestamp = styled.div`
  color: gray;
  font-size: 16px;
  padding-bottom: 16px;
`;

const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;
