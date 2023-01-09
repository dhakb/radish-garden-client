import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import Online from "../online/Online.component";
import Following from "../rightBarFollowing/Following.component";
import {AuthContext} from "../../context/auth/Auth.context";

import {API_BASE_URL} from "../../constants";
import "./RightBar.styles.css"

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const RightBar = ({profile, onlineFriends}) => {
    const {user: currentUser, updateCurrentUser} = useContext(AuthContext)
    const [followings, setFollowings] = useState([])
    const [isFollowing, setIsFollowing] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        const fetchFollowings = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/users/${profile?._id}/followings`)
                setFollowings(response.data)
            } catch (err) {
                console.log(err)
            }
        }

        profile && fetchFollowings()
    }, [profile])


    useEffect(() => {
        setIsFollowing(currentUser?.followings?.includes(profile?._id))
    }, [currentUser.followings, profile?._id])


    const followHandler = async () => {
        try {
            if (isFollowing) {
                const response = await axios.put(`${API_BASE_URL}/api/users/${profile._id}/unfollow`, {userId: currentUser._id})
                updateCurrentUser(response.data.updatedUser)
            } else {
                const response = await axios.put(`${API_BASE_URL}/api/users/${profile._id}/follow`, {userId: currentUser._id})
                updateCurrentUser(response.data.updatedUser)
            }
        } catch (err) {
            console.log(err)
        }
        setIsFollowing(!isFollowing)
    }


    const sendMessageHandler = async () => {
        // Get a conversation by member id
        const response = await axios.get(`${API_BASE_URL}/api/conversations/${currentUser._id}/${profile._id}`)

        // if no conversation between two users create new
        if (!response.data) {
            const response = await axios.post(`${API_BASE_URL}/api/conversations`, {
                senderId: currentUser._id,
                receiverId: profile._id
            })
            console.log(response.data)
        }
        navigate("/messenger")
    }


    const HomePageRightBar = () => {
        return (
            <div className="online-friends-container">
                <h4 className="rightbarTitle">Online Friends ({onlineFriends?.length ? onlineFriends.length : "0"})</h4>
                <ul className="rightbar-online-FriendList">
                    {
                        onlineFriends?.map(friend => (
                            <Online friend={friend} key={friend}/>
                        ))
                    }
                </ul>
            </div>);
    };


    const ProfilePageRightBar = () => {
        return (
            <div className="profileRightBarContainer">
                <div className="rightbar-buttons">
                    {
                        currentUser.username !== profile.username &&
                        <button className="rigthbarFollowingButton" onClick={followHandler}>
                            {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                    }
                    {
                        currentUser.username !== profile.username &&
                        <button className="rigthbarMessageButton" onClick={sendMessageHandler}>Message</button>
                    }

                </div>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Location:</span>
                        <span className="rightbarInfoValue">{profile.location ? profile.location : "Unknown"}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Dimension:</span>
                        <span className="rightbarInfoValue">{profile.dimension ? profile.dimension : "Unknown"}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">followings</h4>
                <div className="rightbarFollowings">
                    {
                        followings.map(following => (
                            <Following following={following} key={following._id}/>
                        ))
                    }
                </div>
            </div>
        );
    };
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {profile ? <ProfilePageRightBar/> : <HomePageRightBar/>}
            </div>
        </div>
    );
}

export default RightBar;