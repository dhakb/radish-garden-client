import React from 'react';
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

const SideBar = () => {
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
                    <li className="sidebarFriend">
                        <img src="/assets/person/1.jpeg" alt="" className="sidebarFriendImg"/>
                        <spam className="sidebarFriendName">Anyta Lekowski</spam>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/person/1.jpeg" alt="" className="sidebarFriendImg"/>
                        <spam className="sidebarFriendName">Anyta Lekowski</spam>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/person/1.jpeg" alt="" className="sidebarFriendImg"/>
                        <spam className="sidebarFriendName">Anyta Lekowski</spam>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/person/1.jpeg" alt="" className="sidebarFriendImg"/>
                        <spam className="sidebarFriendName">Anyta Lekowski</spam>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/person/1.jpeg" alt="" className="sidebarFriendImg"/>
                        <spam className="sidebarFriendName">Anyta Lekowski</spam>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/person/1.jpeg" alt="" className="sidebarFriendImg"/>
                        <spam className="sidebarFriendName">Anyta Lekowski</spam>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/person/1.jpeg" alt="" className="sidebarFriendImg"/>
                        <spam className="sidebarFriendName">Anyta Lekowski</spam>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/person/1.jpeg" alt="" className="sidebarFriendImg"/>
                        <spam className="sidebarFriendName">Anyta Lekowski</spam>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/person/1.jpeg" alt="" className="sidebarFriendImg"/>
                        <spam className="sidebarFriendName">Anyta Lekowski</spam>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/person/1.jpeg" alt="" className="sidebarFriendImg"/>
                        <spam className="sidebarFriendName">Anyta Lekowski</spam>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/person/1.jpeg" alt="" className="sidebarFriendImg"/>
                        <spam className="sidebarFriendName">Anyta Lekowski</spam>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/person/1.jpeg" alt="" className="sidebarFriendImg"/>
                        <spam className="sidebarFriendName">Anyta Lekowski</spam>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/person/1.jpeg" alt="" className="sidebarFriendImg"/>
                        <spam className="sidebarFriendName">Anyta Lekowski</spam>
                    </li>


                </ul>
            </div>
        </div>
    );
};

export default SideBar;