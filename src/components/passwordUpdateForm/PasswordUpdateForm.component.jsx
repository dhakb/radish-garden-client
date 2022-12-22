import {useContext, useState} from "react";
import axios from "axios";

import {AuthContext} from "../../context/auth/Auth.context";

import "./PasswordUpdateForm.styles.css"

const PasswordUpdateForm = ({onModalClose}) => {
    const {user, updateCurrentUser} = useContext(AuthContext)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    console.log(newPassword, confirmPassword)

    const saveChangesHandler = async () => {

        if (newPassword !== confirmPassword || confirmPassword.length < 6) {
            alert("passwords should match and be at least 6 chars")
            return
        }

        try {
            const {data: {message, response}} = await axios.put(`https://radish-garden-api.netlify.app/.netlify/functions/index/api/users/${user._id}`, {password: confirmPassword, userId: user._id})
            setNewPassword("")
            setConfirmPassword("")
            updateCurrentUser(response)
            onModalClose(false)
            alert(message)
        } catch (err) {
            console.log(err)
        }


    }


    return (
        <div className="password-update-form-container">
            <h1 className="password-update-form-title">Change password</h1>
            <p className="password-update-form-message">Update password below.</p>
            <input type="password" placeholder="NEW PASSWORD" onChange={(e) => setNewPassword(e.target.value)} value={newPassword}/>
            <input type="password" placeholder="CONFIRM PASSWORD" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
            <button onClick={saveChangesHandler} className="password-update-form-btn">save</button>
        </div>
    );
};

export default PasswordUpdateForm;