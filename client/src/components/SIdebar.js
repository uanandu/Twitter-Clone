import styled from "styled-components"
import {FiHome, FiUser, FiBell, FiBookmark} from 'react-icons/fi'
import { NavLink } from "react-router-dom"
import {ReactComponent as Logo} from '../assets/logo.svg'

const Sidebar = () => {

    return (
        <>
            <Navigation>
                <Logo/>
                <NavigationLink exact to="/">
                    <HomeIcon />
                    <span>Home</span>
                </NavigationLink>
                <NavigationLink exact to="/profile/me">
                    <ProfileIcon />
                    <span>Profile</span>
                </NavigationLink>
                <NavigationLink exact to="/notifications">
                    <NotificationsIcon />
                    <span>Notifications</span>
                </NavigationLink>
                <NavigationLink exact to="/bookmarks">
                    <BookmarksIcon />
                    <span>Bookmarks</span>
                </NavigationLink>
                <MeowButton className="meow">Meow</MeowButton>
            </Navigation>
        
        </>
    )
}

// styled components
const Navigation = styled.div`
    position: fixed;
    padding: 0 25px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 250px;
    height: 100vh;
    margin-top: 20px;
    border-right: 1px solid lightgray;

    @media (max-width: 900px) {
        display: none;
    }

`
const NavigationLink = styled(NavLink)`
    font-family: 'Roboto', sans-serif;
    text-decoration: none;
    font-weight: 800;
    color: black;
    display: flex;
    align-items: center;    
    padding: 10px;
    border-radius: 20px;
    margin: 10px 0 10px 0;
    
    &:hover {
        background-color: #f5f5f5;
    }

    &.active {
        color: hsl(258deg, 100%, 50%);
        background-color: #e6ecff;
    }

    &:focus {
        outline-color: blue;
    }
`

const HomeIcon = styled(FiHome)`
    width: 30px;
    height: 30px;
    padding: 0 20px;
`
const ProfileIcon = styled(FiUser)`
    width: 30px;
    height: 30px;
    padding: 0 20px;
`
const NotificationsIcon = styled(FiBell)`
    width: 30px;
    height: 30px;
    padding: 0 20px;
`
const BookmarksIcon = styled(FiBookmark)`
    width: 30px;
    height: 30px;
    padding: 0 20px;
`

const MeowButton = styled.button`
    font-size: medium;
    font-weight: 800;
    color: white;
    background-color: hsl(258deg, 100%, 50%);
    border-radius: 25px;
    width: inherit;
    height: 45px;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: hsl(258deg, 75%, 50%);
    }
`

export default Sidebar;