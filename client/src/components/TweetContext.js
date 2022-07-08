import { createContext, useEffect } from "react";
import { useState } from "react";
import moment from "moment";

export const date = moment().format("h:mm a, MMMM Do YYYY");

export const TweetContext = createContext();

export const TweetProvider = ({ children }) => {
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [numOfRetweets, setNumOfRetweets] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);

  const handleToggleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setNumOfLikes(numOfLikes + 1);
    } else {
      setIsLiked(false);
      setNumOfLikes(numOfLikes - 1);
    }
  };

  const handleToggleRetweet = () => {
    if (!isRetweeted) {
      setIsRetweeted(true);
      setNumOfRetweets(numOfRetweets + 1);
    } else {
      setIsRetweeted(false);
      setNumOfRetweets(numOfRetweets - 1);
    }
  };

  return (
    <TweetContext.Provider
      value={{
        date: date,
        isRetweetedByCurrentUser:isRetweeted,
        isLikedByCurrentUser:isLiked,
        handleToggleLike: handleToggleLike,
        handleToggleRetweet: handleToggleRetweet,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};
