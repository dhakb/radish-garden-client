import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress"

import {AuthContext} from "../../context/auth/Auth.context";

import "./Login.styles.css"


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
                    <h3 className="loginLogo">PRIM social</h3>
                    <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
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
                        <span className="loginForgot">Forgot Password?</span>
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