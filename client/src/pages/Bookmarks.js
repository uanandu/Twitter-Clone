import styled from "styled-components";

const Bookmarks = () => {
    return (
        <BookmarkTitle>
        <h1><span>Bookmarks</span></h1>
        </BookmarkTitle>
    );
}

const BookmarkTitle = styled.div`
    position: fixed;
    left: 300px;
    
`

export default Bookmarks;