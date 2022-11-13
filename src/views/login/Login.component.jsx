import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress"

import {AuthContext} from "../../context/auth/Auth.context";

import "./Login.styles.css"

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const Login = () => {
    const {loginUserAsync, isFetching} = useContext(AuthContext)
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


    const logInSubmitHandler = async (e) => {
        e.preventDefault()
        loginUserAsync(email, password)
    }


    const signUpHandler = async () => {
        navigate("/signup")
    }


    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    {/*<img src={PF + "radish_logo_a.png"} alt="" className="radish-logo-login"/>*/}
                    <img src={PF + "purple_radish.png"} alt="" className="radish-logo-login"/>
                    <h3 className="loginLogo-name">Radish Garden</h3>
                    <span className="loginDesc">
                        Connect with plants and make friends.
                    </span>
                </div>
                <div className="loginRight">
                    <form onSubmit={logInSubmitHandler} className="loginBox">
                        <input placeholder="Email" className="loginInput" name="email" type="email" value={email}
                               required
                               onChange={emailChangeHandler}/>
                        <input placeholder="Password" className="loginInput" name="password" type="password"
                               value={password}
                               required
                               onChange={passwordChangeHandler}/>
                        <button className="loginButton" type="submit" disabled={isFetching}>
                            {isFetching ? <CircularProgress size="25px" color="inherit"/> : "Log In"}
                        </button>
                        <span className="loginForgot"></span>
                        <button className="loginRegisterButton" onClick={signUpHandler}>
                            Create a New Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;