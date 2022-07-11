import { useState, useContext, useEffect } from "react"; // for using state, context and effect
import { useLocation, NavLink, useHistory } from "react-router-dom"; // for using location of iDs
import styled from "styled-components"; // for using styled components
import moment from "moment"; // for using moment.js

// Icons
import { AiOutlineCalendar } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";

import { CurrentUserContext } from "../components/Contexts/CurrentUserContext"; // For distributing context

import Header from "../components/Helpers/Tweethelp/Header";
import ActionBar from "../components/Helpers/Tweethelp/ActionBar";

// Extra components for delay, error handling and loading
import { LoadingSpinner } from "../components/Helpers/LoadingSpinner";
import { COLORS } from "../components/Helpers/consonants";
import { ErrorHandling } from "../components/Helpers/ErrorHandling";

export const PeopleProfile = () => {

  // get followers and following from the context
  const { status, currentFollowers, followerStatus } =
    useContext(CurrentUserContext);

  //states for the profile
  //1) for getting the data from the server for specific user
  const [peopleProfile, setPeopleProfile] = useState({});
  const [profileStatus, setProfileStatus] = useState("loading");

  //2) for getting the feed
  const [peopleProfileFeed, setPeopleProfileFeed] = useState({});
  const [profileFeedStatus, setProfileFeedStatus] = useState("loading");

  const location = useLocation();
  //   const history = useHistory();
  const history = useHistory();

  const handleViewTweet = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // history.push({
    //   pathname: `/tweet/${tweetId}`,
    // });
  }

  //for followers
  let isFollowingMe = false;

  // fetch the profile data for the specific user  by handle from profile
  useEffect(() => {
    let handle = location.state.profileHandle;
    fetch(`/api/${handle}/profile`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("profile data", data.profile);
        setPeopleProfile(data);
        setProfileStatus("idle");
      })
      .catch((err) => {
        setProfileStatus("error");
      });
    return setProfileStatus("loading");
  }, []);

  // fetch the feed data for the specific user by handle from profile
  useEffect(() => {
    let handle = location.state.profileHandle;
    // console.log(handle)

    fetch(`/api/${handle}/feed`)
      .then((res) => res.json()) 
      .then((data) => {
        // console.log("feed data", data.feed);
        setPeopleProfileFeed(data);
        setProfileFeedStatus("idle");
      })
      .catch((err) => {
        setProfileFeedStatus("error");
      });
    return setProfileFeedStatus("loading");
  }, []);

  //   check if we have the data set
  // console.log("profile feed", peopleProfileFeed);
  // console.log("profile feed status", profileFeedStatus);
  // console.log("profile data", peopleProfile);
  // console.log("profile status", profileStatus);

  let consolidatedArray = []; // for storing the tweets

  // this is for the user profile data
  // to show if the user is following me or not
  if (profileStatus === "idle") {
    if (followerStatus === "idle") {
      if (currentFollowers.includes(peopleProfile.profile.handle)) {
        isFollowingMe = true;
      }
    }
  }

  // this is for the profile feed
  if (profileFeedStatus === "idle") {
    peopleProfileFeed["tweetIds"].forEach((tweetId) => {
      consolidatedArray.push(
        Object.values(peopleProfileFeed["tweetsById"]).find(
          (tweet) => tweet.id === tweetId
        )
      );
    });
  }

  // to make sure that the code doesnt break
  if (!peopleProfile.profile) {
    return <LoadingSpinner />;
  }

  const handleShowTweet = ({e, tweet}) => {
    e.preventDefault();
    e.stopPropogation();

    history.push({
      pathname: `/tweet/${tweet.id}`,
    });
  }

  return (
    <>
      <Wrapper>
        <TopPart>
          <Banner
            style={{
              backgroundImage: `url(${peopleProfile.profile.bannerSrc})`,
            }}
          ></Banner>
          <AvatarDiv>
            <Avatar src={peopleProfile.profile.avatarSrc} />
            <Button>Following</Button>
          </AvatarDiv>
          <PersonalInfo>
            <DIsplayName to={`/${peopleProfile.profile.handle}/profile`}>{peopleProfile.profile.displayName}</DIsplayName>
            <div>
              <Handle>{peopleProfile.profile.handle}</Handle>
              {isFollowingMe ? (
                <span className="following">Follows You</span>
              ) : (
                <></>
              )}
            </div>
          </PersonalInfo>
          <Description>{peopleProfile.profile.bio}</Description>
          <OtherInfo>
            {peopleProfile.profile.location ? (
              <Location>
                <HiOutlineLocationMarker />
                {peopleProfile.profile.location}
              </Location>
            ) : (
              <></>
            )}
            <JoinedOn>
              <AiOutlineCalendar />
              Joined {moment(peopleProfile.profile.joined).format("MMM YYYY")}
            </JoinedOn>
          </OtherInfo>
          <Follow>
            <Following>
              {peopleProfile.profile.numFollowing} following
            </Following>
            <Followers>
              {peopleProfile.profile.numFollowers} followers
            </Followers>
          </Follow>
        </TopPart>
        <MiddlePart>
          <Tabs>
            <TweetsHere>Tweets</TweetsHere>
            <MediaHere>Media</MediaHere>
            <LikesHere>Likes</LikesHere>
          </Tabs>
        </MiddlePart>
        <BottomPart>
        {profileFeedStatus === "idle" && (
              consolidatedArray.map(
                (tweet) => {
                  console.log("tweet inside peopleprofile", tweet);
                  return (
                    <TweetContainerHere tabIndex="0"
                      key={tweet.id}
                      onClick={(e)=>handleShowTweet(e, tweet)}
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
        {status === "error" && <ErrorHandling />}
      </Wrapper>
    </>
  );
};

// styled components

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;
  margin: 0 20px 0 300px;
  border-right: 1px solid lightgray;

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
  position: static;
  width: 100%;
  height: 250px;
  background-size: cover;
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
  transform: translate(20px,-50px);
  border-radius: 50%;
  z-index: 5;
`;
const Button = styled.button`
  position: relative;
  font-weight: 800;
  color: white;
  background-color: ${COLORS.primary};
  width: 100px;
  height: 30px;
  border-radius: 25px;
  right: 10px;
  cursor: pointer;
`;

const PersonalInfo = styled.div`
  margin-left: 10px; 

  .following {
    background-color: lightgray;
    font-size: 12px;
    padding: 5px;
    margin-left: 10px;
    border-radius: 5px;
  }
`;
const DIsplayName = styled.div`
  font-size: 30px;
  font-weight: 800;
  margin-top: 10px;
  margin-left: 10px; 
`;
const Handle = styled.span`
  font-size: 20px;
  color: gray;
  margin: 10px 10px 0 10px;
`;
const Description = styled.p`
    margin-left: 10px; 

`;
const OtherInfo = styled.div`
    margin-left: 10px; 
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

const BottomPart = styled.div`
  border-bottom: 1px solid lightgray;
`;
