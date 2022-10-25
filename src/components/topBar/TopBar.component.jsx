import React from 'react';
import {Person, Search, Chat, Notifications} from "@mui/icons-material";

import "./TopBar.styles.css"

const TopBar = () => {
    return (
        <div className="topBarContainer">
            <div className="topBarLeft">
                <span className="log">Prim Social</span>
            </div>
            <div className="topBarCenter">
                <div className="searchBar">
                    <Search className="searchIcon"/>
                    <input type="text" className="searchInput" placeholder="search whatever you want"/>
                </div>
            </div>
            <div className="topBarRight">
                <div className="topBarLinks">
                    <span className="topBarLink">Hompage</span><
                    span className="topBarLink">Timeline</span>
                </div>
                <div className="topBarIcons">
                    <div className="topBarIconItem">
                        <Person/>
                        <span className="topBarIconBadge">4</span>
                    </div>
                    <div className="topBarIconItem">
                        <Chat/>
                        <span className="topBarIconBadge">4</span>
                    </div>
                    <div className="topBarIconItem">
                        <Notifications/>
                        <span className="topBarIconBadge">4</span>
                    </div>
                </div>
                <img src="/assets/person/6.jpeg" alt="" className="topBarImg"/>
            </div>
        </div>
    );
};

export default TopBar;