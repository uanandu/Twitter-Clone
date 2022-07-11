import { useContext, useState } from "react"; // for the context
import { NavLink } from "react-router-dom";
import moment from "moment"; // for formatting the time
import styled from "styled-components"; // for styling
import { useHistory } from "react-router-dom";
// icons
import { AiOutlineCalendar } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Icon } from 'react-icons-kit'
import {bullhorn} from 'react-icons-kit/icomoon/bullhorn'

import { CurrentUserContext } from "../components/Contexts/CurrentUserContext"; // for context

// Extra components needed for error handling, and loading spinner
import { LoadingSpinner } from "../components/Helpers/LoadingSpinner";
import { COLORS } from "../components/Helpers/consonants";
import { ErrorHandling } from "../components/Helpers/ErrorHandling";

// components needed for the tweet
import Header from "../components/Helpers/Tweethelp/Header";
import ActionBar from "../components/Helpers/Tweethelp/ActionBar";

const Profile = () => {
  // get the current user from the context
  const { currentUser, status, currentUserProfileFeed, profileFeedStatus } =
    useContext(CurrentUserContext);

  // states for the tweet
  const [showTweets, setShowTweets] = useState(false);

  const handleToggleShowTweets = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTweets(!showTweets);
  }

  const history = useHistory();

  const handleShowTweet = (e, tweet) => {
    e.preventDefault();
    e.stopPropagation();
    history.push({
      pathname: `/tweet/${tweet.id}`,
    })
  }

  if (status === "idle") {
    return (
      <>
        <Wrapper>
          <TopPart>
            <Banner
              style={{
                backgroundImage: `url(${currentUser.profile.bannerSrc})`,
              }}
            ></Banner>
            <AvatarDiv>
              <Avatar src={currentUser.profile.avatarSrc} />
              <Button>Following</Button>
            </AvatarDiv>
            <PersonalInfo>
              <DIsplayName to={`/${currentUser.profile.handle}/profile`}>{currentUser.profile.displayName}</DIsplayName>
              <Handle>@{currentUser.profile.handle}</Handle>
            </PersonalInfo>
            <Description>{currentUser.profile.bio}</Description>
            <OtherInfo>
              {currentUser.profile.location ? (
                <Location>
                  <HiOutlineLocationMarker />
                  {currentUser.profile.location}
                </Location>
              ) : (
                <></>
              )}
              <JoinedOn>
                <AiOutlineCalendar />
                Joined {moment(currentUser.profile.joined).format("MMM YYYY")}
              </JoinedOn>
            </OtherInfo>
            <Follow>
              <Following>
                {currentUser.profile.numFollowing} following
              </Following>
              <Followers>
                {currentUser.profile.numFollowers} followers
              </Followers>
            </Follow>
          </TopPart>
          <Divider />
          <MiddlePart>
            <Tabs>
              <TweetsHere className="tweet-tab" onClick={(e)=> {handleToggleShowTweets(e)}}>Tweets</TweetsHere>
              <MediaHere>Media</MediaHere>
              <LikesHere>Likes</LikesHere>
            </Tabs>
          </MiddlePart>
          <BottomPart>
            {profileFeedStatus === "idle" && !showTweets ? (
                <Instructions>
                <Icon icon={bullhorn} size={100} />
                <p>Please click on the <strong>Tweets</strong> tab to show toggle your tweet feed</p>
                </Instructions>
              ) : (
                <>
                </>
                )}
            {profileFeedStatus === "idle" && showTweets && (
              Object.values(currentUserProfileFeed["tweetsById"]).map(
                (tweet) => {
                  return (
                    <TweetContainerHere tabIndex="0"
                    key={tweet.id}
                    onClick={(e)=> {
                      e.preventDefault();
                      e.stopPropagation();
                      handleShowTweet(tweet)}
                    }
                    
                    >
                      <Header tweet={tweet} />
                      <Content>
                        {tweet.status}
                        {tweet.media.length > 0 ? (
                          <img
                            style={{ margin: "10px", width: "800px" }}
                            src={tweet.media[0].url}
                            alt="tweet media"
                          />
                        ) : (
                          <></>
                        )}
                      </Content>
                      <ActionBar isLiked={tweet.isLiked} tweetID={tweet.id} />
                      <Divider />
                    </TweetContainerHere>
                  );
                }
              )
            )
            }
            {profileFeedStatus === "loading" && (
              <>
                <LoadingSpinner />
              </>
            )}
            
          </BottomPart>
        </Wrapper>
      </>
    );
  } else if (status === "error") {
    return <ErrorHandling/>;
  } else {
    return <LoadingSpinner />;
  }
};
// styled components

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px 0 300px;
  border-right: 1px solid lightgray;
  width: 900px;
  height: auto;
  min-height: 100vh;

  @media (max-width: 900px) {
    margin: 0 10px 0 10px;
    width: auto;
    border-right: none;
  }

`;

const TopPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 900px;
`;
const Banner = styled.img`
  width: 100%;
  max-width: 900px;
  background-size: cover;
  height: 300px;
  top: 0;
  z-index: -1;
`;

const AvatarDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Avatar = styled.img`
  position: relative;
  width: 150px;
  height: 150px;
  transform: translate(20px, -50px);
  border-radius: 50%;
  z-index: 1;
`;
const Button = styled.button`
  position: relative;
  font-weight: 800;
  color: white;
  background-color: ${COLORS.primary};
  width: 100px;
  height: 30px;
  border-radius: 30px;
  margin-top: 10px;
  right: 10px;
  cursor: pointer;
`;

const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 10px;
  .following {
    background-color: lightgray;
    font-size: 12px;
    padding: 5px;
    border-radius: 5px;
  }
`;
const DIsplayName = styled(NavLink)`
  font-size: 30px;
  font-weight: 800;
  margin-top: 10px;
`;
const Handle = styled.span`
  font-size: 20px;
  color: gray;
  margin-top: 10px;
  margin-right: 10px;
`;
const Description = styled.p`
  margin: 10px;
`;
const OtherInfo = styled.div`
  margin: 10px;
`;
const Location = styled.span`
  font-size: 15px;
  color: gray;
  margin-top: 10px;
  margin-right: 10px;
`;
const JoinedOn = styled.span`
  font-size: 15px;
  color: gray;
  margin-top: 10px;
  margin-right: 10px;
`;
const Follow = styled.div`
  margin: 20px 0 10px 0;
  color: gray;
`;

const Following = styled.span`
  margin: 10px;
`;
const Followers = styled.span`
  margin: 10px;
`;

const MiddlePart = styled.div`
  margin: 10px 0 10px 0;
  width: 900px;
`;

const Instructions = styled.div`
  margin-top: 20px;
  font-size: 25px;
  text-align: center;
`

const Tabs = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 10px 0;
`;
const TweetsHere = styled.button`
  background-color: white;
  font-size: 20px;
  width: 100%;
  padding: 10px;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${COLORS.primary};
    border-bottom: 2px solid ${COLORS.primary};
    cursor: pointer;
  }

  &:focus {
    outline: none;
    color: ${COLORS.primary};
    border-bottom: 2px solid ${COLORS.primary};
  }
`;
const MediaHere = styled.button`
  background-color: white;
  font-size: 20px;
  width: 100%;
  padding: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    color: ${COLORS.primary};
    border-bottom: 2px solid ${COLORS.primary};
    cursor: pointer;
  }
`;
const LikesHere = styled.button`
  background-color: white;
  font-size: 20px;
  width: 100%;
  padding: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    color: ${COLORS.primary};
    border-bottom: 2px solid ${COLORS.primary};
    cursor: pointer;
  }
`;

const BottomPart = styled.div``;

const TweetContainerHere = styled.div`
  padding: 10px;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 10px 0;
`;

const Divider = styled.div`
  height: 1px;
  background-color: lightgray;
`;

export default Profile;
