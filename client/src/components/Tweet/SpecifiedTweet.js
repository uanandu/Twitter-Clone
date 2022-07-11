import { useLocation, useHistory, NavLink, useParams } from "react-router-dom"; // for locating a tweet
import { useState, useEffect, useContext } from "react"; // for manipulating the tweet

import styled from "styled-components"; // for styling
import moment from "moment"; // for formatting the time

// Icon kit
import { Icon } from "react-icons-kit";
import { arrowLeft2 } from "react-icons-kit/icomoon/arrowLeft2";

import { CurrentUserContext } from "../Contexts/CurrentUserContext"; // import the context

import ActionBar from "../Helpers/Tweethelp/ActionBar"; // for the action bar (like, retweet, comment, etc.)

import { LoadingSpinner } from "../Helpers/LoadingSpinner"; // for the loading spinner
import { ErrorHandling } from "../Helpers/ErrorHandling"; // ErrorHandling

const SpecifiedTweet = () => {

  const {tweetId} = useParams();

  const { status } = useContext(CurrentUserContext); // we deconstruct the context

  // states
  const [tweetInfo, setTweetInfo] = useState({});
  const [tweetInfoStatus, setTweetInfoStatus] = useState("loading");

  // finds location of the tweet
  const location = useLocation();

  // gives access to the history instance
  const history = useHistory();

  // check to see the locatio with click on ID
  // console.log("check location", location.state.tweetID);
  // let tweetID = location.state.tweetID; //get the profileHandle data from history.push used

  // fetch the tweet info based on the tweetID where we click
  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("received tweet info", data);
        setTweetInfo(data); //this has to be called before the change of status to 'idle'
        setTweetInfoStatus("idle");
      });
  }, []); // no dependency array, so it will only run once

  // open the profile of the user who posted the tweet
  const handleOpenProfile = (ev) => {
    ev.preventDefault(); //we need this and stoppropagation to prevent the event handleOpenTweetDetails() in the Homefeed.js component from firing
    ev.stopPropagation();
    // console.log("profile opening called from tweetdetails", tweetInfo);

    let handle = tweetInfo.tweet.author.handle;

    history.push({
      pathname: `/profile/${handle}`,
      // state: { profileHandle: handle },
    });
  };

  if (tweetInfoStatus === "idle") {
    return (
      <>
        <Wrapper tabIndex="0">
          <PageDescription>
            <NavLink to="/">
              <Icon icon={arrowLeft2} size={20} />
            </NavLink>
            <PageTitle>Meow</PageTitle>
          </PageDescription>
          <UserId>
            <Avatar src={tweetInfo.tweet.author.avatarSrc} />
            <UserName>
              <DisplayName
                className="displayname"
                onClick={(e) => {
                  handleOpenProfile(e);
                }}
              >
                {tweetInfo.tweet.author.displayName}
              </DisplayName>
              <Handle className="handle">
                @{tweetInfo.tweet.author.handle}
              </Handle>
            </UserName>
          </UserId>
          <TweetContent>
            <>{tweetInfo.tweet.status}</>
            {tweetInfo.tweet.media.map((tweet) => {
              // console.log(tweet);
              return <Image src={tweet.url} alt="tweet media" />;
            })}
          </TweetContent>
          <TweetTime>
            {moment(tweetInfo.tweet.timeStamp).format(
              "MMMM Do YYYY, h:mm:ss a"
            )}{" "}
            . Critter Web App
          </TweetTime>
          <ActionBar tweetID={tweetId} />
        </Wrapper>
      </>
    );
  } else if (status === "error") {
    return <ErrorHandling />;
  } else {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }
};

// styled components

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
  max-width: 900px;
  width: auto;
  height: 100vh;
  margin-left: 300px;
  margin-bottom: 20px;
  padding: 20px;
  line-height: 2rem;
  border-right: 1px solid lightgray;

  @media (max-width: 900px) {
    margin-left: 0px;
    margin-bottom: 0px;
    padding: 0px;
    border-right: none;
  }
`;

const PageDescription = styled.div`
  display: flex;
  align-items: center;
`;
const PageTitle = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-left: 10px;
`;

const UserId = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
`;
const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 10px;
`;
const UserName = styled.div`
  font-size: 1.2rem;
`;
const DisplayName = styled.div`
  font-weight: 800;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
const Handle = styled.div`
  color: lightgray;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;
const TweetContent = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  font-size: 1.2rem;
`;
const TweetTime = styled.div`
  font-size: 1rem;
  color: gray;
`;
const Divider = styled.div`
  height: 1px;
  background-color: lightgray;
`;
const Image = styled.img`
  position: relative;
  width: 100%;
  max-width: 800px;
`;

export default SpecifiedTweet;
