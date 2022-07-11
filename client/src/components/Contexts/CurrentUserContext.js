import { createContext, useEffect, useState } from "react"; // for creating context and using hooks
import moment from "moment"; // for date formatting

export const date = moment().format("h:mm a, MMMM Do YYYY");

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  // user states - we use this for the current user
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");

  // home feed states - we use this for the home feed
  const [currentUserHomeFeed, setCurrentUserHomeFeed] = useState({});
  const [homeFeedStatus, setHomeFeedStatus] = useState("loading");

  //profile states - we use this for the profile
  const [currentUserProfileFeed, setCurrentUserProfileFeed] = useState([]);
  const [profileFeedStatus, setProfileFeedStatus] = useState("loading");

  // tweet states - we use this for the tweet
  const [tweetArray, setTweetArray] = useState([]);
  const [newtweetStatus, setNewTweetStatus] = useState(false);

  // for followers 
  const [currentFollowers, setCurrentFollowers] = useState([]);
  const [followerStatus, setFollowerStatus] = useState("loading");

  // PROFILE ENDPOINT - Relating to user and profiles
  useEffect(() => {
    fetch(`api/me/profile`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("Inside CurrentUserContext - profile data", data);
        setCurrentUser(data);
        setStatus("idle");
      })
      .catch((err) => {
        setStatus("error");
      });
  }, []);

  // FOLLOWERS ENDPOINT
  useEffect(() => {
    fetch(`/api/treasurymog/followers`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Inside CurrentUserContext - followers", data);
        let followerArray = [];
        data["followers"].forEach((follower) => {
          followerArray.push(follower.handle);
        });
        setCurrentFollowers(followerArray);
        setFollowerStatus("idle");
      })
      .catch((err) => {
        setStatus("error");     
      });
  }, []);

    // FEED ENDPOINT - Group of tweets from all users that the user is following
    useEffect(() => {
      fetch(`api/me/home-feed`)
        .then((res) => res.json())
        .then((data) => {
          // console.log("Inside CurrentUserContext - home feed", data);
          setCurrentUserHomeFeed(data);
          setHomeFeedStatus("idle");
        })
        .catch((err) => {
          setStatus("error");
        });
    }, [newtweetStatus]);
    // we add this dependency to refetch the data and update the home feed
  
    // USER FEED ENDPOINT - Group of tweets from the user
    useEffect(() => {
      fetch(`api/treasurymog/feed`)
        .then((res) => res.json())
        .then((data) => {
          // console.log("Inside CurrentUserContext - personal", data);
          setCurrentUserProfileFeed(data);
          setProfileFeedStatus("idle");
        })
        .catch((err) => {
          setStatus("error");
        });
    }, []);

  // console.log("followers", currentFollowers);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        status,
        currentUserHomeFeed, 
        setCurrentUserHomeFeed,
        homeFeedStatus,
        currentUserProfileFeed,
        profileFeedStatus,
        tweetArray, 
        setTweetArray,
        newtweetStatus,
        setNewTweetStatus,
        currentFollowers,
        followerStatus,      
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
