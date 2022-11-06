import {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Chat, Notifications, Person, Search} from "@mui/icons-material";

import {AuthContext} from "../../context/auth/Auth.context";
import "./TopBar.styles.css"

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const TopBar = () => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)

    const logoutHandler = () => {
        localStorage.setItem("user", null)
        navigate("/")
        window.location.reload()
    }

    return (
        <div className="topBarContainer">
            <div className="topBarLeft">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span className="log">Prim Social</span>
                </Link>
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
                        <Chat onClick={() => navigate("/messenger")}/>
                        <span className="topBarIconBadge">4</span>
                    </div>
                    <div className="topBarIconItem">
                        <Notifications/>
                        <span className="topBarIconBadge">4</span>
                    </div>
                </div>
                <img src={user?.profilePicture ? `${PF}${user.profilePicture}` : `${PF}avatar.png`} alt=""
                     className="topBarImg" onClick={() => navigate(`/profile/${user.username}`)}/>
                <button onClick={logoutHandler}>Log out</button>
            </div>
        </div>
    );
};

export default TopBar;