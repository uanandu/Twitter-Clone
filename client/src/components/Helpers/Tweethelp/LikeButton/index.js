import styled from "styled-components";

// For distributing context
import { useContext } from "react";
import { TweetContext } from "../../../Contexts/TweetContext";

// Components from different files
import PoppingCircle from "./PoppingCircle";
import Heart from "./Heart";
import ScaleIn from "./ScaleIn";

// const PARTICLE_COLORS = ["#e53935", "#1e88e5", "#43a047", "#fdd835", "#fb8c00"];

const LikeButton = ({size = 40, tweetId }) => {
  const heartSize = size * 0.6;

  const { isLikedByCurrentUser} = useContext(TweetContext);
  let isLiked = false;

  // console.log("isLikedByCurrentUser", isLikedByCurrentUser)
  // console.log("tweetID", tweetId);


  Array.from(isLikedByCurrentUser).forEach((IDtoCompare)=> {
      if (IDtoCompare === tweetId) {
        isLiked = true;
      }
    })

  return (
    <MainWrapper>
    <Wrapper style={{ width: size, height: size }}>
      {/* Conditionally wrapping the heart to scale in case user clicks like button */}
      {isLiked ? (
        <>
          <ScaleIn>
            <Heart width={heartSize} isToggled={isLiked} />
          </ScaleIn>
        </>
      ) : (
        <Heart width={heartSize} isToggled={isLiked} />
        )}
      {isLiked && <PoppingCircle size={size}  color="#E790F7"/>}
    </Wrapper>
      {isLiked ? (<LikeNumber>1</LikeNumber>) : <></>}
    </MainWrapper>

  );
};

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const LikeNumber = styled.div`
  margin-left: 60px;
  font-size: 20px;
`;



export default LikeButton;
