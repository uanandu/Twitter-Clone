import styled from "styled-components";
import { Icon } from "react-icons-kit";
import {bookmarkO} from 'react-icons-kit/fa/bookmarkO'
import {cogs} from 'react-icons-kit/icomoon/cogs'

const Bookmarks = () => {
  return (
    <>
    <Wrapper>
      <BookmarkTitle>
        <MainDiv>Bookmarks</MainDiv>
        <Icon icon={bookmarkO} size={50} />
      </BookmarkTitle>
      <Message>
        <MainDiv>
          This page is under construction. Please check back later.   
        </MainDiv>
        <Icon icon={cogs} size={50}/>
      </Message>
    </Wrapper>


    </>
  );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const BookmarkTitle = styled.div`
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

export default Bookmarks;
