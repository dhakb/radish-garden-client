import {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios"
import {Chat, Notifications, Search} from "@mui/icons-material";

import ProfileDropdown from "../accountDropdown/ProfileDropdown.component";

import {AuthContext} from "../../context/auth/Auth.context";
import "./TopBar.styles.css"

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const TopBar = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const [rightClick, setRightClick] = useState(false)
    const [avatarImage, setAvatarImage] = useState("")


    useEffect(() => {
        const fetchAvatarImg = async () => {
            const response = await axios.get(`http://localhost:8080/api/upload/${user.profilePicture}`)
            setAvatarImage(response.data.filename)
        }

        user.profilePicture && fetchAvatarImg()
    }, [user.profilePicture])


    const rightClickAvatarHandler = (e) => {
        e.preventDefault()
        setRightClick(!rightClick)
    }
    console.log(user.profilePicture)
    console.log(avatarImage)
    return (
        <div className="topBarContainer">
            <div className="topBarLeft">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span className="log">Radish Garden</span>
                </Link>
            </div>
            <div className="topBarCenter">
                <div className="searchBar">
                    <Search className="searchIcon"/>
                    <input type="text" className="searchInput" placeholder="search for users by username"/>
                </div>
            </div>
            <div className="topBarRight">
                <div className="topBarIcons">
                    <div className="topBarIconItem">
                        <Chat onClick={() => navigate("/messenger")}/>
                        <span className="topBarIconBadge">4</span>
                    </div>
                    <div className="topBarIconItem">
                        <Notifications/>
                        <span className="topBarIconBadge">4</span>
                    </div>
                </div>
                <div className="profile-info-wrapper">
                    <div className="profile-info" onClick={() => navigate(`/profile/${user.username}`)} onContextMenu={rightClickAvatarHandler}>
                        <img
                            src={avatarImage ? `http://localhost:8080/api/upload/image/${avatarImage}` : `${PF}avatar.png`}
                            alt=""
                            className="topBarImg"/>
                        <p>{user.username}</p>
                    </div>

                    {
                        rightClick && <ProfileDropdown/>
                    }
                </div>

            </div>
        </div>
    );
};

export default TopBar;