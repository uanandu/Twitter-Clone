import styled from "styled-components";
import { Icon } from "react-icons-kit";
import {bell} from 'react-icons-kit/fa/bell'
import {cogs} from 'react-icons-kit/icomoon/cogs'

const Notifications = () => {
  return (
    <Wrapper>
      <Notification>
        <MainDiv>Notifications</MainDiv>
        <Icon icon={bell} size={50} />
      </Notification>
      <Message>
        <MainDiv>
          This page is under construction. Please check back later.
        </MainDiv>
        <Icon icon={cogs} size={50} />
      </Message>
    </Wrapper>
  );
};


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Notification = styled.div`
  display: flex;
  left: 300px;
  align-items: center;
`;

const MainDiv = styled.h1`
  margin: 20px;
`;

const Message = styled.div`
    display: flex;
    transform: translate(90px, 200px);
`

export default Notifications;
