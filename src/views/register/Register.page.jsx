import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import "./Register.styles.css"

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
        if (password !== confirmPassword) {
            alert("Passwords don't match!")
        } else {

            try {
                await axios.post('http://localhost:8080/api/auth/register', {
                    username,
                    email,
                    password: confirmPassword,
                })
                navigate("/login")
            } catch (err) {
                console.log(err)
            } finally {
                setUsername("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
            }
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
                               onChange={userNameChangeHandler} required/>
                        <input placeholder="Email" className="loginInput" value={email} onChange={emailChangeHandler}
                               required/>
                        <input placeholder="Password" className="loginInput" value={password}
                               type="password"
                               onChange={passwordChangeHandler} required/>
                        <input placeholder="Password Again" className="loginInput" value={confirmPassword}
                               type="password"
                               onChange={confirmPasswordChangeHandler} required/>
                        <button className="loginButton" type="submit" onClick={signupSubmitHandler}>Sign Up</button>
                        <button className="loginRegisterButton" onClick={() => navigate("/login")}>
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;