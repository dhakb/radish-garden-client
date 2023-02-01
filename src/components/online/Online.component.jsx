import {useEffect, useState} from "react";
import axios from "axios";

import {API_BASE_URL} from "../../constants";
import "./Online.styles.css"

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const Online = ({friend}) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const getUserByUserId = async () => {
           const response = await axios.get(`${API_BASE_URL}/api/users/?userId=${friend}`)
            setUser(response.data)
        }
        getUserByUserId()
    }, [friend])

    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img className="rightbarProfileImg" src={user?.profilePicture ? `${API_BASE_URL}/api/upload/${user.profilePicture}` : `${PF}avatar.png`} alt="" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    );
};

export default Online;