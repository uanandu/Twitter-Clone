import styled from "styled-components";

// For distributing context
import { useContext } from "react";
import { TweetContext } from "../../TweetContext";

// Components from different files
import PoppingCircle from "./PoppingCircle";
import Heart from "./Heart";
import ScaleIn from "./ScaleIn";

const PARTICLE_COLORS = ["#e53935", "#1e88e5", "#43a047", "#fdd835", "#fb8c00"];

const LikeButton = ({ isLiked, size = 40 }) => {
  const heartSize = size * 0.6;

  const {isLikedByCurrentUser} = useContext(TweetContext);

  return (
    <Wrapper style={{ width: size, height: size }}>
      {/* Conditionally wrapping the heart to scale in case user clicks like button */}
      {isLikedByCurrentUser ? (
        <ScaleIn>
          <Heart width={heartSize} isToggled={isLiked} />
        </ScaleIn>
      ) : (
        <Heart width={heartSize} isToggled={isLiked} />
        )}
      {isLikedByCurrentUser && <PoppingCircle size={size}  color="#E790F7"/>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;



export default LikeButton;