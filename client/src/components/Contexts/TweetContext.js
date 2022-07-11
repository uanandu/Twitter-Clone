import { useState, useEffect, useContext, createContext } from "react"; // for creating context and using hooks

import { CurrentUserContext } from "./CurrentUserContext"; // import the context

export const TweetContext = createContext(null);

export const TweetProvider = ({ children }) => {
  // feed states
  const { homeFeedStatus, currentUserHomeFeed } =
    useContext(CurrentUserContext);

  console.log("currentUserHomeFeed", currentUserHomeFeed); // gives us the tweetIDs and tweetsByID
  // console.log("homeFeedStatus", homeFeedStatus); // either "loading" or "idle"

  // states for the tweet actions
  const [isLiked, setIsLiked] = useState([]); // we set this as an array to keep track of liked tweets
  const [isRetweeted, setIsRetweeted] = useState([]); // we set this as an array to keep track of retweeted tweets
  
  // to store tweetIDs for comnparison on:
  // 1. liking a tweet : we store it on isLiked
  // 2. retweeting a tweet : we store it on isRetweeted
  useEffect(() => {

    let containmentArrayForLikes = []; // this stores that are the tweets that are being displayed
    let containmentArrayForRetweets = []; // this stores that are the tweets that are being displayed

    if (homeFeedStatus === "idle") {
      Object.values(currentUserHomeFeed["tweetsById"]).forEach((tweet) => {
        if (tweet.isLiked === true) {
          containmentArrayForLikes.push(tweet.id);
          // console.log("containmentArrayForLikes", containmentArrayForLikes);
        }
        if (tweet.isRetweeted === true) {
          containmentArrayForRetweets.push(tweet.id);
          // console.log("containmentArrayForRetweets", containmentArrayForRetweets);
        }
      });
      setIsLiked(containmentArrayForLikes);
      // console.log("containment array for liked", isLiked); // points out the specific liked tweet
      setIsRetweeted(containmentArrayForRetweets);
      // console.log("containment array for retweeted", isRetweeted); // points out the specific retweeted tweet
    }
  }, [homeFeedStatus]); // dependency of homeFeedStatus is to make sure it only runs when homeFeedStatus changes to idle

  // toggle like called by like button
  const handleToggleLike = (e, tweetID) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("tweetID", tweetID)

    if (homeFeedStatus === "idle") {

      // let arrayForCurrentUserLikes = Object.values(currentUserHomeFeed["tweetsById"]).find(tweet => tweet.id === tweetID);
      // console.log("arrayForCurrentUserLikes", arrayForCurrentUserLikes);

      // let arrayForCurrentUserLikes = Object.values(currentUserHomeFeed["tweetsById"]).find(tweet => tweet.id === tweetID);
      // console.log("arrayForCurrentUserLikes", arrayForCurrentUserLikes);

      let containmentArrayForLikes = []; // we use this array to store the tweet IDs of the tweets that are liked

      if (isLiked.includes(tweetID)) {
        currentUserHomeFeed["tweetsById"][tweetID].isLiked = false;

        Object.values(currentUserHomeFeed["tweetsById"]).forEach((tweet) => {
          //make sure that the same tweet isnt liked twice
          if (tweet.isLiked === true && tweet.id !== tweetID) {
            containmentArrayForLikes.push(tweet.id);
            // console.log("containmentArrayForLikes", containmentArrayForLikes);
          }
        });

        // STRETCH GOAL:/
        //============//
        // Instruction//
        // Remove "like" from a tweet that we already liked
        fetch(`/api/tweet/${tweetID}/like`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ like: false }),
        })
          .then((res) => res.json())
          .then((data) => {
            setIsLiked(containmentArrayForLikes); //
            // console.log("data", containmentArray);
          });
      } else {

        Object.values(currentUserHomeFeed["tweetsById"]).forEach((tweet) => {
          if (tweet.isLiked === true || tweet.id === tweetID) {
            containmentArrayForLikes.push(tweet.id);
            currentUserHomeFeed["tweetsById"][tweetID].isLiked = true;
            console.log("containmentArrayForLikes:", containmentArrayForLikes);
          }
        });
                
        // STRETCH GOAL:/
        //============//
        // Instruction//
        // Add "like" to a tweet that we haven't liked yet
        fetch(`/api/tweet/${tweetID}/like`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ like: true }),
        })
          .then((res) => res.json())
          .then(() => {
            setIsLiked(containmentArrayForLikes);
            // setNumOfLikes(containmentArray.length);
          });
      }
    }
  };

  // toggle retweet
  const handleToggleRetweet = (e, tweetID) => {
    e.preventDefault();
    e.stopPropagation();

    if (homeFeedStatus === "idle") {
      // let arrayForCurrentUserRetweets = Object.values(currentUserHomeFeed["tweetsById"]).find(
      //   tweet => tweet.id === tweetID
      // );
      // console.log("arrayForCurrentUserRetweets", arrayForCurrentUserRetweets);

        let containmentArrayForRetweets = []; // we use this array to store the tweet IDs of the tweets that are retweeted
        
        if (isRetweeted.includes(tweetID)) {
          currentUserHomeFeed["tweetsById"][tweetID].isRetweeted = false;

          Object.values(currentUserHomeFeed["tweetsById"]).forEach((tweet) => {
            //make sure that the same tweet isnt liked twice
            if (tweet.isRetweeted === true && tweet.id !== tweetID) {
              containmentArrayForRetweets.push(tweet.id);
            }
          }
          );

        // STRETCH GOAL:/
        //============//
        // Instruction//
        // Remove "retweet" from a tweet that we already retweeted
          fetch(`/api/tweet/${tweetID}/retweet`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ retweet: false }),
          })
            .then((res) => res.json())
            .then((data) => {
              setIsRetweeted(containmentArrayForRetweets); //
            }
          )
        }
        else {

          Object.values(currentUserHomeFeed["tweetsById"]).forEach((tweet) => {
            if (tweet.isLiked === true || tweet.id === tweetID) {
              containmentArrayForRetweets.push(tweet.id);
              currentUserHomeFeed["tweetsById"][tweetID].isRetweeted = true;
            }
          });
                  
        // STRETCH GOAL:/
        //============//
        // Instruction//
        // Add "retweet" from a tweet that we haven't retweeted yet
          fetch(`/api/tweet/${tweetID}/like`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ like: true }),
          })
            .then((res) => res.json())
            .then(() => {
              setIsRetweeted(containmentArrayForRetweets);
            });
    }
    }
  };

  return (
    <TweetContext.Provider
      value={{
        isRetweetedByCurrentUser: isRetweeted,
        isLikedByCurrentUser: isLiked,
        isLiked,
        handleToggleLike,
        handleToggleRetweet,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};
