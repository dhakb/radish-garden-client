import {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Chat, Notifications, Search} from "@mui/icons-material";

import ProfileDropdown from "../accountDropdown/ProfileDropdown.component";
import SearchOutputDropdown from "../searchOutputDropdown/SearchOutputDropdown.component";

import {AuthContext} from "../../context/auth/Auth.context";
import "./TopBar.styles.css"
import axios from "axios";

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const TopBar = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState("")
    const [rightClick, setRightClick] = useState(false)
    const [filteredUsers, setFilteredUsers] = useState([])

    useEffect(() => {
        const fetchUsersByfilter = async () => {
            const response = await axios.get(`http://localhost:8080/api/users/filter/${searchInput}`)
            setFilteredUsers(response.data)
        }

        searchInput && fetchUsersByfilter()
    }, [searchInput])


    const rightClickAvatarHandler = (e) => {
        e.preventDefault()
        setRightClick(!rightClick)
    }

    return (
        <div className="topBarContainer">
            <div className="topBarLeft">
                <Link to="/" style={{textDecoration: "none"}} className="logo-container">
                    <img className="radish-logo" src={PF+"purple_radish.png"} alt=""/>
                    <span className="logo-title">Radish Garden</span>
                </Link>
            </div>
            <div className="topBarCenter">
                <div className="searchBar">
                    <Search className="searchIcon"/>
                    <input type="text" className="searchInput" onChange={(e) => setSearchInput(e.target.value)}
                           value={searchInput} placeholder="search for users by username..."/>
                </div>
                {
                 searchInput && <SearchOutputDropdown users={filteredUsers}/>
                }
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
                    <div className="profile-info" onClick={() => navigate(`/profile/${user.username}`)}
                         onContextMenu={rightClickAvatarHandler}>
                        <img
                            src={user.profilePicture ? `http://localhost:8080/api/upload/image/${user.profilePicture}` : `${PF}avatar.png`}
                            alt=""
                            className="topBarImg"/>
                        <p className="profile-info-username">{user.username}</p>
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