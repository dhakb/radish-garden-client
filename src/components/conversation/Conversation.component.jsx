import {useEffect, useState} from "react";
import axios from "axios";

import {API_BASE_URL} from "../../constants";
import "./Conversation.styles.css"

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

function Conversation({conversation, currentUser}) {
    const [user, setUser] = useState(null)


    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get(`${API_BASE_URL}/api/users/?userId=${conversation.members.find((id) => id !== currentUser._id)}`)
            setUser(response.data)
        }

        getUser()

    }, [conversation, currentUser])

    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src={user?.profilePicture ? `${API_BASE_URL}/api/upload/${user.profilePicture}` : `${PF}avatar.png`}
                alt=""
            />
            <span className="conversationName">{user?.username}</span>
        </div>
    );
}


export default Conversation