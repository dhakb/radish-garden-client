import {useEffect, useState} from "react";
import axios from "axios";

import "./Online.styles.css"

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const Online = ({friend}) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const getUserByUserId = async () => {
           const response = await axios.get(`https://radish-garden-api.netlify.app/.netlify/functions/index/api/users/?userId=${friend}`)
            setUser(response.data)
        }
        getUserByUserId()
    }, [friend])

    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img className="rightbarProfileImg" src={user?.profilePicture ? `https://radish-garden-api.netlify.app/.netlify/functions/index/api/upload/image/${user.profilePicture}` : `${PF}avatar.png`} alt="" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    );
};

export default Online;