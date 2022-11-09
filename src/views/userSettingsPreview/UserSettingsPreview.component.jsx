import {NavLink, Outlet} from "react-router-dom";

import "./UserSettingsPreview.styles.css"

const UserSettingsPreview = () => {
    return (
        <div className="user-settings-preview-container">
            <h2 className="setting-header">User settings</h2>
            <div className="setting-option-links">
                <NavLink to="/settings/account"
                         className={({isActive}) => isActive ? "active-option-link" : "option-link"}>Account</NavLink>
                <NavLink to="/settings/profile"
                         className={({isActive}) => isActive ? "active-option-link" : "option-link"}>Profile</NavLink>
            </div>
            <Outlet/>
        </div>
    );
};

export default UserSettingsPreview;