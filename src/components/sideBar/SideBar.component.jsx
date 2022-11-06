import {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {AuthContext} from "../../context/auth/Auth.context";


import {
    Bookmark,
    Chat,
    Event,
    Group,
    HelpOutline,
    PlayCircleFilledOutlined,
    RssFeed,
    School,
    WorkOutline
} from "@mui/icons-material";

import "./SideBar.styles.css"
import CloseFriend from "../closeFriend/CloseFriend.component";
import axios from "axios";




const SideBar = () => {
    const {user: currentUser} = useContext(AuthContext)
    const [followings, setFollowings] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

        const getFollowings = async () => {

            try {
                const response = await axios.get(`http://localhost:8080/api/users/${currentUser._id}/followings`)
                setFollowings(response.data)
            } catch (err) {
                console.log(err)
            }
        }

        getFollowings()
    }, [currentUser])


    return (
        <div className="sideBar">
            <div className="sideBarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon"/>
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilledOutlined className="sidebarIcon"/>
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarIcon"/>
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon"/>
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon"/>
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutline className="sidebarIcon"/>
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon"/>
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarIcon"/>
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>
                <button className="sidebarButton">show more</button>
                <hr className="sidebarHr"/>
                <ul className="sidebarFriendList">
                    {
                        followings.map(following => (
                            <CloseFriend user={following} key={following._id} navigateToProfile={() => navigate(`/profile/${following.username}`)}/>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default SideBar;