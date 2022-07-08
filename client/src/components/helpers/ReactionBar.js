
import { useContext } from "react";
import styled from "styled-components";
import { TweetContext } from "../TweetContext";
import Action from "./Action";
import TweetActionIcon from "./TweetActionIcon";
import LikeButton from "./LikeButton/Index";

export const ReactionBar = () => {
    const { isRetweetedByCurrentUser, isLikedByCurrentUser, handleToggleLike, handleToggleRetweet } = useContext(TweetContext);

  return (
    <Wrapper>
      <Action color="rgb(27, 149, 224)" size={40}>
        <TweetActionIcon kind="reply" />
      </Action>
      <Action
        color="rgb(23, 191, 99)"
        size={40}
        onClickFunc={handleToggleRetweet}
      >
        <TweetActionIcon
          kind="retweet"
          color={isRetweetedByCurrentUser ? "rgb(23, 191, 99)" : undefined}
        />
      </Action>
      <Action color="rgb(224, 36, 94)" size={40} onClickFunc={handleToggleLike}>
        <LikeButton isLiked={isLikedByCurrentUser} />
      </Action>
      <Action color="rgb(27, 149, 224)" size={40}>
        <TweetActionIcon kind="share" />
      </Action>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 48px;
`;