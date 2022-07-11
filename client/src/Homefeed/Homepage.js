import styled from "styled-components";
import { useContext } from "react";

import { CurrentUserContext } from "../components/Contexts/CurrentUserContext"; // import the context

import { Icon } from "react-icons-kit";
import { home } from "react-icons-kit/icomoon/home";

import { UserTweet } from "../components/Tweet/UserTweet"; // for the personal tweet
import { TweetWrapper } from "./TweetWrapper"; // for the tweet container
import { ErrorHandling } from "../components/Helpers/ErrorHandling"; // error handling
import { LittleLoader } from "../components/Helpers/LoadingSpinner"; // small spinner

export const Homepage = () => {
  const { status, homeFeedStatus, currentUserHomeFeed } =
    useContext(CurrentUserContext);

  // console.log("this is inside homepage",currentUserHomeFeed)

  let containmentArray = [];

  // when the user is logged in
  // this finds all the elements matching the tweet.id and puts them in an array(containmentArray)
  if (homeFeedStatus === "idle") {
    currentUserHomeFeed["tweetIds"].forEach((id) => {
      // console.log("id",id)
      containmentArray.push(
        Object.values(currentUserHomeFeed["tweetsById"]).find(
          (tweet) => tweet.id === id
        )
      );
    });
  }

  return (
    <>
      <Wrapper>
        <PageDiv>
          <Icon icon={home} size={50} />
          <PageTitle>Homefeed</PageTitle>
        </PageDiv>
        <Divider />
        <UserTweet />
        {/* Feed here */}
        {homeFeedStatus === "idle" ? (
          containmentArray.map((tweet) => {
            // console.log("this is the tweet that we pass",tweet)
            return <TweetWrapper key={tweet.id} tweet={tweet} />;
          })
        ) : (
          <LittleLoader />
        )}
        {/* Error Handling */}
        {status === "error" ? <ErrorHandling /> : null}
      </Wrapper>
    </>
  );
};

// styled component

const PageDiv = styled.div`
  position: fixed;
  display: flex;
  background-color: white;
  width: 900px;
  height: 60px;
  left: 291px;
  align-items: center;
  margin-left: 10px;
  z-index: 1;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 10px 0 10px 10px;

  @media (max-width: 900px) {
    text-align: center;
    margin-left: 0px;
    margin-bottom: 0px;
    padding: 0px;
    left: 0;
    border-right: none;
  }

`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  height: 100vh;
  margin-left: 300px;
  font-family: "Roboto", sans-serif;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;

  @media (max-width: 900px) {
    margin-left: 0px;
    margin-bottom: 0px;
    padding: 0px;
    border-right: none;
  }

  @media (max-width: 600px) {
    width: 50vw;
    margin-left: 0px;
    margin-bottom: 0px;
    padding: 0px;
    border-right: none;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 3px;
  background-color: lightgray;
`;
