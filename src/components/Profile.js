import React, { useContext, useEffect, useState } from 'react'
import userContext from '../Context/User/userContext'
import { MyQuestions } from './MyQuestions';
import { Link } from 'react-router-dom';
import "../css/Profile.css"
import {ReactComponent as NotifIcon} from "../Assets/Rest/Notification.svg"
// import {ReactComponent as NotifIconActive} from "../Assets/Click/Notification.svg"
import {ReactComponent as CreditIcon} from "../Assets/Click/Credits.svg"
import {ReactComponent as ProfileIcon} from "../Assets/Click/Profile.svg"
import { NavItem } from './Notifications/NavItem';
import { Dropdown } from './Notifications/Dropdown';
import { Tag } from './Tag';
// import {ReactComponent as Settings} from '../Assets/Rest/Settings.svg'
export const Profile = () => {
    const host = process.env.REACT_APP_BACKEND_URL;
    const uContext = useContext(userContext);
    const {user, getUserByAuthToken} = uContext;

    const [favTags, setFavTags] = useState([])
    const getFavs = async() => {
        const response = await fetch(`${host}/api/tags/get`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setFavTags(json.tags);

    }

    useEffect(() => {
        getUserByAuthToken();
        getFavs();
        return () => {
            
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div className="profile-main">
            <div className="top-icons">
                    {/* <NotifIconActive className='icon-top'/> */}
                    <NavItem icon={<NotifIcon/>}>
                        <Dropdown type="notif"></Dropdown>
                    </NavItem>
                    <NavItem icon={<CreditIcon/>}>
                        <Dropdown type="credits"></Dropdown>
                    </NavItem>
                    <Link to="/profile">
                    <ProfileIcon className="icon-top"/>
                    </Link>
            </div>

            <div className="profile-head">
                <div className="user-dp">
                    {user.dp&&<img className="dp" src={user.dp} alt="dp" />}
                </div>
                <div className="profile-info">
                    <div className="user-head">
                        <h3 className="username">{user.username}</h3>
                        <Link to="/settings" className="gear">
                        <i className="fas fa-cog "></i>
                        </Link>
                    </div>
                    <div className="name">
                        {user.first+ " "+user.last}
                    </div>
                    {/* <small>{user.city}</small> */}
                </div>
                <div className="analytics">
                    <div className="profile-an-item">
                        Number of Answers accepted: {user.AnswersAccepted}
                    </div>
                    <div className="profile-an-item">
                        Number of Questions posted: {user.QuestionsPosted}
                    </div>
                    <div className="profile-an-item">
                        Average feedback stars: {user.Stars}
                    </div>
                </div>
                <div className="favourite-tags">
                    My Favourites: {favTags.map((tag)=>{
                        return <Tag value={tag}/>
                    })}
                    {/* overflowX: hidden */}
                </div>
            </div>
            <MyQuestions/>
        </div>
    )
}
