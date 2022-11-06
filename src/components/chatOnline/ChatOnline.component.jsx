import {useState, useEffect} from "react";
import axios from "axios"

import "./ChatOnline.styles.css"
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

function ChatOnline({currentUserId, onlineUsers, setCurrentChat}) {
    const [followings, setFollowings] = useState([])
    const [onlineFollowings, setOnlineFollowings] = useState([])


    useEffect(() => {
        const getFollowings = async () => {
            const response = await axios.get(`http://localhost:8080/api/users/${currentUserId}/followings`)
            setFollowings(response.data)
        }
        getFollowings()
    }, [currentUserId])


    useEffect(() => {
        setOnlineFollowings(followings.filter(following => onlineUsers.includes(following._id)))
    }, [followings, onlineUsers])

    const getConversationHandler = async (userId) => {
        try {
        const response = await axios.get(`http://localhost:8080/api/conversations/${userId}/${currentUserId}`)
        setCurrentChat(response.data)
        } catch (err) {
            console.log(err)
        }

    }


    return (
        <div className="chatOnline">
            {
                onlineFollowings.map((following) => (
                    <div className="chatOnlineFriend" key={following._id} onClick={() => getConversationHandler(following._id)}>
                        <div className="chatOnlineImgContainer">
                            <img className="chatOnlineImg" src={following?.profilePicture ? `${PF}${following.profilePicture}` : `${PF}avatar.png`} alt=""/>
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineName">{following?.username}</span>
                    </div>
                ))
            }
        </div>
    );
}

export default ChatOnline