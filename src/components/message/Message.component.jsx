import {useEffect, useState} from "react";
import axios from "axios";
import { format } from 'timeago.js';
import "./Message.component.css"

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

function Message({own, message}) {
    const [user, setUser] = useState(null)


    useEffect(() => {
        const getUser = async () => {
        const response = await axios.get(`http://localhost:8080/api/users/?userId=${message.sender}`)
        setUser(response.data)
        }
        getUser()
    }, [message.sender])

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg"
                     src={user?.profilePicture ? `${PF}${user.profilePicture}` : `${PF}avatar.png`}
                     alt=""/>
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    );
}

export default Message