import styled from "styled-components"
import {FiHome, FiUser, FiBell, FiBookmark} from 'react-icons/fi'
import { NavLink } from "react-router-dom"
import { useContext } from "react";

import {ReactComponent as Logo} from '../assets/logo.svg'

import {CurrentUserContext} from "../components/CurrentUserContext"

const Sidebar = () => {

    const {currentUserUpdate} = useContext(CurrentUserContext)

    return (
        <div>
            <Navigation>
                <Logo/>
                <NavigationLink exact to="/">
                    <HomeIcon />
                    <span>Home</span>
                </NavigationLink>
                <NavigationLink exact to="/profile">
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
            </Navigation>
        
        </div>
    )
}

// styled Items

const Navigation = styled.div`
    position: fixed;
    padding: 0 25px;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    height: 500px;
    background-color: #f5f5f5;
    border-radius: 10px;
`
const NavigationLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;    
    padding: 10px;
    border-radius: 10px;
    
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

export default Sidebar;