import {useEffect, useState} from "react";
import axios from "axios";

import "./Conversation.styles.css"

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

function Conversation({conversation, currentUser}) {
    const [user, setUser] = useState(null)


    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get(`https://radish-garden-api.netlify.app/.netlify/functions/index/api/users/?userId=${conversation.members.find((id) => id !== currentUser._id)}`)
            setUser(response.data)
        }

        getUser()

    }, [conversation, currentUser])

    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src={user?.profilePicture ? `https://radish-garden-api.netlify.app/.netlify/functions/index/api/upload/image/${user.profilePicture}` : `${PF}avatar.png`}
                alt=""
            />
            <span className="conversationName">{user?.username}</span>
        </div>
    );
}


export default Conversation