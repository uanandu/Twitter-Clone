import styled from "styled-components";

const TweetHeader = () => {
  return (
    <Wrapper>
      <Avatar src="https://c.tenor.com/4XDps2j7zhwAAAAj/cat-thumbs-up.gif"/>
      <TweetInfo>
        <TweetName>Mushu</TweetName>
        <TweetHandle>@mushuthefluff</TweetHandle>
      </TweetInfo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const TweetInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 16px;
`;

const TweetName = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 16px;
`;

const TweetHandle = styled.div`
  font-size: 15px;
  line-height: 20px;
  color: rgb(101, 119, 134);
`;

export default TweetHeader;