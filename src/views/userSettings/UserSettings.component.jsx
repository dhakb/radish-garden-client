import {useContext, useState} from "react";

import TopBar from "../../components/topBar/TopBar.component";
import {AuthContext} from "../../context/auth/Auth.context";
import "./EditProfile.styles.css"


const UserSettings = () => {
    const [updatedUsername, setUpdatedUsername] = useState("")
    const {user} = useContext(AuthContext)
    console.log(user)

    // const userNameUpdateHandler = async () => {
    //     try {
    //         await axios.put(`http://localhost:8080/api/users/${user._id}`, {desc: "I'm hannah and I'm from pandora", userId: user._id})
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    return (
        <>
            <TopBar/>
            <div>
                <div className="setting-options-container">
                    <div className="setting-option" tabIndex="1">Change user name</div>
                    <div className="setting-option">Change Password</div>
                    <div className="setting-option">Upload/Change profile picture</div>
                    <div className="setting-option">Upload/change profile picture</div>
                </div>
                <div className="display-setting-container">

                </div>
            </div>

        </>
    );
};

export default UserSettings;