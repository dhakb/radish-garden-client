import {useEffect, useState} from "react";
import axios from "axios";
import { format } from 'timeago.js';
import "./Message.component.css"

import {API_BASE_URL} from "../../constants";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

function Message({own, message}) {
    const [user, setUser] = useState(null)


    useEffect(() => {
        const getUser = async () => {
        const response = await axios.get(`${API_BASE_URL}/api/users/?userId=${message.sender}`)
        setUser(response.data)
        }
        getUser()
    }, [message.sender])

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg"
                     src={user?.profilePicture ? `${API_BASE_URL}/api/upload/${user.profilePicture}` : `${PF}avatar.png`}
                     alt=""/>
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    );
}

export default Message