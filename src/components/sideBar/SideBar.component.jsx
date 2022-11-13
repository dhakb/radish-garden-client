import {useContext, useEffect, useState} from 'react';
import {useNavigate, Link} from "react-router-dom";

import {AuthContext} from "../../context/auth/Auth.context";

import {
    Bookmark,
    Chat,
    HelpOutline,
    PlayCircleFilledOutlined,
    RssFeed,
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
                    <Link to="/" className="sidebarListItem" style={{textDecoration: "none", color: "inherit"}} onClick={() => window.location.reload()}>
                        <RssFeed/>
                        <span className="sidebarListItemText">Feed</span>
                    </Link>
                    <Link to="/messenger" className="sidebarListItem" style={{textDecoration: "none", color: "inherit"}}>
                        <Chat className="sidebarIcon"/>
                        <span className="sidebarListItemText">Chats</span>
                    </Link>
                    {/*<li className="sidebarListItem">*/}
                    {/*    <PlayCircleFilledOutlined className="sidebarIcon"/>*/}
                    {/*    <span className="sidebarListItemText">Videos</span>*/}
                    {/*</li>*/}
                    {/*<li className="sidebarListItem">*/}
                    {/*    <Bookmark className="sidebarIcon"/>*/}
                    {/*    <span className="sidebarListItemText">Bookmarks</span>*/}
                    {/*</li>*/}
                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon"/>
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                </ul>
                <hr className="sidebarHr"/>
                <h2 className="side-bar-following-title">Plants You Follow ({followings.length})</h2>
                <ul className="sidebarFriendList">
                    {
                       followings?.map(following => (
                            <CloseFriend user={following} key={following?._id} navigateToProfile={() => navigate(`/profile/${following.username}`)}/>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default SideBar;