import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Person} from "@mui/icons-material";

import {AuthContext} from "../../context/auth/Auth.context";

import "./ProfileDropdown.style.css"


const ProfileDropdown = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()


    const logoutHandler = () => {
        localStorage.setItem("user", null)
        navigate("/")
        window.location.reload()
    }


    return (
        <div className="dropdown-container">
            <div className="dropdown-header">
                <Person/>
                <span>My Stuff</span>
            </div>
            <button onClick={() => navigate(`/profile/${user.username}`)} className="dropdown-btn">Profile</button>
            <button onClick={() => navigate("/settings/account")} className="dropdown-btn">User Settings</button>
            <button onClick={logoutHandler} className="dropdown-btn">Log out</button>
        </div>
    );
};

export default ProfileDropdown;