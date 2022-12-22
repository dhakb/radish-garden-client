import axios from "axios";
import {useContext, useState} from "react";

import {AuthContext} from "../../context/auth/Auth.context";

import "./UsernameUpdateForm.styles.css"

const UserNameUpdateForm = ({onModalClose}) => {
    const {user, updateCurrentUser} = useContext(AuthContext)
    const [updatedUsername, setUpdatedUsername] = useState("")



    const saveChangesHandler = async () => {
        if(updatedUsername.length < 3) {
            alert("Username should be at least 3 characters")
            return
        }
        const updatedData = {
            userId: user._id,
            username: updatedUsername
        }
        const {data: {response}} = await axios.put(`https://radish-garden-api.netlify.app/.netlify/functions/index/api/users/${user._id}`, {...updatedData})
        updateCurrentUser(response)
        onModalClose(false)
    }


    return (
        <div className="username-update-form-container">
            <h1 className="username-update-form-username">Update username</h1>
            <p className="username-update-form-message">Update your username below. There will be a new verification email sent that you will need to use to verify this new username.</p>
            <input placeholder="NEW USERNAME" onChange={(e) => setUpdatedUsername(e.target.value)}/>
            <button onClick={saveChangesHandler} className="username-update-form-btn">save</button>
        </div>
    );
};

export default UserNameUpdateForm;