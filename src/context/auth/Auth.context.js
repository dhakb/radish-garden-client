import {createContext, useReducer} from "react";
import axios from "axios"
import {authReducer} from "./Auth.reducers";
import {AUTH_ACTION_TYPES} from "./Auth.actions";

const CONTEXT_INITIAL_STATE = {
    user: null,
    loginUserAsync: () => {
    },
    isFetching: false
}

export const AuthContext = createContext(CONTEXT_INITIAL_STATE)


const initialState = {
    user: {
        "profilePicture": "person/9.jpeg",
        "coverPicture": "person/9.jpeg",
        "followers": [],
        "followings": [
            "635808257ebc4268cccb5f21",
            "635808057ebc4268cccb5f1f"
        ],
        "isAdmin": false,
        "_id": "635808427ebc4268cccb5f23",
        "username": "hannah_here",
        "email": "hannah@gmail.com",
        "password": "$2b$10$T3aww89F.XRDiloNMmbm2uuaK7UWmV/BH8WfvNQAqkDWWYQYY82dK",
        "createdAt": "2022-10-25T16:01:06.768Z",
        "updatedAt": "2022-10-25T16:12:32.012Z",
        "__v": 0,
        "city": "kalamari",
        "country": "laraland",
        "desc": "I'm dome from pandora"
    },
    // user: null,
    isFetching: false,
    error: null
}

const AuthContextProvider = ({children}) => {
    const [{user, isFetching, error}, dispatch] = useReducer(authReducer, initialState)

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
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email,
                password,
            })
            console.log("RESPONSE", response)
            loginUserSuccess(response.data)
        } catch (err) {
            console.log(err)
            loginUserFailed(err)
        }
    }

    const value = {
        user,
        isFetching,
        error,
        loginUserAsync
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export default AuthContextProvider
