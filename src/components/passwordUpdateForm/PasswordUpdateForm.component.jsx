import {useContext, useState} from "react";
import axios from "axios";

import {AuthContext} from "../../context/auth/Auth.context";

import "./PasswordUpdateForm.styles.css"

const PasswordUpdateForm = ({onModalClose}) => {
    const {user, updateCurrentUser} = useContext(AuthContext)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const saveChangesHandler = async () => {
        if (newPassword !== confirmPassword && confirmPassword < 6) {
            alert("passwords should match and be at list six chars")
            return
        }

        try {
            const {data: {message, response}} = await axios.put(`http://localhost:8080/api/users/${user._id}`, {password: confirmPassword, userId: user._id})
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
            <h1>Change password</h1>
            <p>Update password below.</p>
            <input placeholder="NEW PASSWORD" onChange={(e) => setNewPassword(e.target.value)} value={newPassword}/>
            <input placeholder="CONFIRM PASSWORD" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
            <button onClick={saveChangesHandler}>Assign password</button>
        </div>
    );
};

export default PasswordUpdateForm;