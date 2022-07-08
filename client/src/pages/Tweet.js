import styled from "styled-components";
import { useState, useContext } from "react";

import TweetHeader from "../components/helpers/TweetHeader";
import {date} from "../components/TweetContext";
import {Stat} from "../components/helpers/Stat";
import {ReactionBar} from "../components/helpers/ReactionBar";

const Tweet = () => {
    return (
        <Wrapper>
            <TweetHeader/>
            <Tweetbody/>
            <TweetStamp>{date}</TweetStamp>
            <Divider/>
            <Stat/>
            <Divider/>
            <ReactionBar/>
            <Divider/>
        </Wrapper>
    );
}


const Wrapper = styled.div`
  background: white;
  width: 580px;
  padding: 16px;
  text-align: left;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
`;

const Tweetbody = styled.div`
    font-size: 22px;
    padding: 16px 0;
`

const TweetStamp = styled.div`
  color: rgb(101, 119, 134);
  font-size: 16px;
  padding-bottom: 16px;
`
const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;

export default Tweet;