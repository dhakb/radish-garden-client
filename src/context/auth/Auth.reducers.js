import axios from "axios";
import {AUTH_ACTION_TYPES} from "./Auth.actions";


export const authReducer = (state, action) => {
    const {type, payload} = action

    switch (type) {
        case AUTH_ACTION_TYPES.LOGIN_USER_START:
            return {
                ...state,
                isFetching: true,
            }
        case AUTH_ACTION_TYPES.LOGIN_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                user: payload
            }
        case AUTH_ACTION_TYPES.LOGIN_USER_FAILED:
            return {
                ...state,
                isFetching: false,
                error: payload
            }
        default:
            throw new Error(`Unhandled type of ${type} in authReducer`)

    }
}