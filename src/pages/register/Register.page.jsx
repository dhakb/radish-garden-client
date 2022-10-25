import {useState} from "react";
import {useNavigate} from "react-router-dom";

import "./Register.styles.css"
import {svgIconClasses} from "@mui/material";

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const userNameChangeHandler = (e) => setUsername(e.target.value)
    const emailChangeHandler = (e) => setEmail(e.target.value)
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
    }
    const confirmPasswordChangeHandler = (e) => {
        setConfirmPassword(e.target.value)
    }

    const signupSubmitHandler = async () => {

        console.log(username, email, password)

        try {
            console.log("try")
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password: confirmPassword,
                })
            })
            console.log(response)
        } catch (err) {
            console.log(err)
        } finally {
            setUsername("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
        }

    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Lamasocial</h3>
                    <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input placeholder="Username" className="loginInput" value={username}
                               onChange={userNameChangeHandler}/>
                        <input placeholder="Email" className="loginInput" value={email} onChange={emailChangeHandler}/>
                        <input placeholder="Password" className="loginInput" value={password}
                               onChange={passwordChangeHandler}/>
                        <input placeholder="Password Again" className="loginInput" value={confirmPassword}
                               onChange={confirmPasswordChangeHandler}/>
                        <button className="loginButton" type="submit" onClick={signupSubmitHandler}>Sign Up</button>
                        <button className="loginRegisterButton" onClick={() => navigate("/login")}>
                            Log into Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;