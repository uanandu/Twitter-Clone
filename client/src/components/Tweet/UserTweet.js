import { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import { COLORS } from "../Helpers/consonants";

import { CurrentUserContext } from "../Contexts/CurrentUserContext";
import { LoadingSpinner } from "../Helpers/LoadingSpinner";
import { ErrorHandling } from "../Helpers/ErrorHandling";

export const UserTweet = () => {
  const { currentUser, status, newtweetStatus, setNewTweetStatus } =
    useContext(CurrentUserContext); // get the context

  // States//
  //------//
  //for button - to exercute submission of tweet
  const [disabled, setDisabled] = useState(false);

  // text to put as status on submission
  const [text, setText] = useState("");

  // for character count
  const [characterCount, setCharacterCount] = useState(280);
  const [characterColor, setCharacterColor] = useState("gray");

  // for change of color of character count
  useEffect(() => {
    if (characterCount < 0) {
      setCharacterColor("red");
    } else if (characterCount <= 40) {
      setCharacterColor("orange");
    } else {
      setCharacterColor("gray");
    }
  }, []);

  // event for character count and text
  const handleTextChange = (e) => {
    setText(e.target.value);
    setCharacterCount(280 - e.target.value.length);

    if (characterCount < 0) {
      setCharacterColor("red");
      setDisabled(true);
    } else {
      setCharacterColor("gray");
    }
  };

  // event for submit
  const handleSubmit = () => {
    setText("");
    //meow has been submitted and the text is inputText
    if (text.length > 0) {
      fetch("/api/tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: `${text}` }),
      })
        .then((res) => res.json())
        .then((data) => {
          // received tweet post answer
          setNewTweetStatus(!newtweetStatus); //changing this state in order to notify CurrentUserContext.js for rerendering using useEffect
          // setText("");
          setCharacterCount(280);
          setCharacterColor("gray");
          setDisabled(false);

        });
    } else {
      alert("No tweets here!");
    }
  };

  if (status === "idle") {
    return (
      <TweetWrapper tabIndex="0">
        <InputSection>
          <Avatar src={currentUser.profile.avatarSrc}></Avatar>
          <InputTweet
            placeholder="What's happening?"
            onChange={(e) => handleTextChange(e)}
            autoFocus
          />
        </InputSection>
        <SubmitSection>
          <span style={{ color: characterColor }}>{characterCount}</span>
          <Button
            disabled={disabled}
            style={
              disabled
                ? { opacity: "0.5" }
                : { opacity: "1", cursor: "pointer" }
            }
            onClick={handleSubmit}
          >
            Tweet
          </Button>
        </SubmitSection>
        <Divider/>
      </TweetWrapper>
    );
  } else if (status === "error") {
    return <ErrorHandling/>;
  } else {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }
};

// styled elements

const TweetWrapper = styled.div`
  position: relative;
  font-family: "Roboto", sans-serif;
  display: flex;
  margin: 60px 20px 0 0;
  flex-direction: column;
`;
const InputSection = styled.form`
  display: flex;
  margin-top: 15px;
  border-radius: 5px;
  padding: 10px 0 5px 10px;
  border: none;
  background-color: transparent;
  resize: none;
  outline: none;

  &:hover {
    border: 1px solid lightgray;
  }

  &:focus {
    border: 1px solid ${COLORS.primary};
  }
`;
const InputTweet = styled.textarea`
  position: relative;
  width: 90%;
  height: 150px;
  margin-left: 10px;
  font-size: 20px;
  border: none;

  &:focus {
    outline: none;
  }
`;
const SubmitSection = styled.div`
  display: flex;
  justify-content: flex-end;

  span {
    margin-right: 10px;
    font-size: 20px;
  }
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Button = styled.button`
  width: 100px;
  height: 50px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 25px;
  background-color: hsl(258deg, 100%, 50%);
  color: white;
  font-size: medium;
  font-weight: 800;
  cursor: pointer;
`;

const Divider = styled.div`
  width: 900px;
  height: 10px;
  background-color: lightgray;
`
