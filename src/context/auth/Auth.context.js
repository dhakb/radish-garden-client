import {createContext, useEffect, useReducer} from "react";
import axios from "axios"
import {authReducer} from "./Auth.reducers";
import {AUTH_ACTION_TYPES} from "./Auth.actions";
import {API_BASE_URL} from "../../constants";

const CONTEXT_INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: null,
    loginUserAsync: () => {
    },
    updateCurrentUser: () => {
    }
}

export const AuthContext = createContext(CONTEXT_INITIAL_STATE)


const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: null
}

const AuthContextProvider = ({children}) => {
    const [{user, isFetching, error}, dispatch] = useReducer(authReducer, INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
    }, [user])


    const loginUserStart = () => {
        dispatch({type: AUTH_ACTION_TYPES.LOGIN_USER_START})
    }

    const loginUserSuccess = (user) => {
        dispatch({type: AUTH_ACTION_TYPES.LOGIN_USER_SUCCESS, payload: user})
    }

    const loginUserFailed = (error) => {
        dispatch({type: AUTH_ACTION_TYPES.LOGIN_USER_FAILED, payload: error})
    }

    const loginUserAsync = async (email, password) => {
        loginUserStart()
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
                email,
                password,
            })
            loginUserSuccess(response.data)
        } catch (err) {
            console.log(err)
            loginUserFailed(err)
        }
    }

    const updateCurrentUser = (updatedUser) => {
        dispatch({type: AUTH_ACTION_TYPES.UPDATE_USER, payload: updatedUser})
    }


    const value = {
        user,
        isFetching,
        error,
        loginUserAsync,
        updateCurrentUser
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export default AuthContextProvider
