import {useState} from "react";
import {useNavigate} from "react-router-dom";

import "./Login.styles.css"


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const emailChangeHandler = (e) => {
        const {value} = e.target
        setEmail(value)
    }

    const passwordChangeHandler = (e) => {
        const {value} = e.target
        setPassword(value)
    }


    const logInSubmitHandler = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            if(response.ok) {
                console.log("Logged in")
            } else {
                console.log("user not found!")
            }


        } catch (err) {
            console.log(err)
        } finally {
            setEmail('')
            setPassword("")
        }
    }


    const signUpHandler = async () => {
        navigate("/signup")
        try {
            // fetch()
        } catch (err) {
            console.log(err)
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
                        {/*<form>*/}
                        <input placeholder="Email" className="loginInput" name="email" type="email" value={email}
                               onChange={emailChangeHandler}/>
                        <input placeholder="Password" className="loginInput" name="password" type="password"
                               value={password}
                               onChange={passwordChangeHandler}/>
                        <button className="loginButton" type="submit" onClick={logInSubmitHandler}>Log In</button>
                        {/*</form>*/}
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton" onClick={signUpHandler}>
                            Create a New Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;