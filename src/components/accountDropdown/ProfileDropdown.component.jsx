import {useNavigate} from "react-router-dom";

import "./ProfileDropdown.style.css"


const ProfileDropdown = () => {
    const navigate = useNavigate()


    const logoutHandler = () => {
        localStorage.setItem("user", null)
        navigate("/")
        window.location.reload()
    }


    return (
        <div className="dropdown-container">
            <button onClick={() => navigate("/settings")}>User Settings</button>
            <button onClick={logoutHandler} className="logout-button">Log out</button>
        </div>
    );
};

export default ProfileDropdown;