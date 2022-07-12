import styled from "styled-components";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { AiOutlineRetweet } from "react-icons/ai";

const Header = ({ tweet }) => {
  // console.log("this is inside header", tweet);

  // const handleUserProfile = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   history.push({
  //     pathname: `/${handle}/profile`,
  //   });
  // }

  return (
    <Wrapper>
      <TweetInfo>
        {/* { Here, we check if this is retweeted or not*/}
        {tweet.hasOwnProperty("retweetFrom") && (
          <div className="retweet">
            <Retweet>
              <AiOutlineRetweet size={25} />
              <div style={{marginRight: "10px"}}>{tweet.retweetFrom.displayName}</div>Remeowed
            </Retweet>
          </div>
        )}
        <PersonalInfo>
          <Avatar src={tweet.author.avatarSrc} />
          <Name>
            <DisplayName 
            key={tweet.id}
            onClick={(e)=> {
              // e.preventDefault();
              e.stopPropagation();              
            }
            }
            to={`/profile/${tweet.author.handle}`}
            >
              {tweet.author.displayName}
            </DisplayName>
            <Username>@{tweet.author.handle}</Username>.
            <TimeStamp>
              {moment(tweet.timeStamp).format("MMMM Do YYYY")}
            </TimeStamp>
          </Name>
        </PersonalInfo>
      </TweetInfo>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  margin: 10px;
`;

const Retweet = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: gray;
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

const TweetInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const PersonalInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const Name = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0px 16px;
`;

const DisplayName = styled(NavLink)`
  font-size: 17px;
  line-height: 20px;
  font-weight: bold;
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Username = styled.div`
  font-size: 15px;
  line-height: 20px;
  margin: 0 5px 0 5px;
  color: gray;

  &:hover {
    cursor: pointer;
  }
`;

const TimeStamp = styled.div`
  font-size: 15px;
  margin: 0 5px 0 5px;
  color: gray;
`;

export default Header;
