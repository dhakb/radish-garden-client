import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Online from "../online/Online.component";

import Following from "../rightBarFollowing/Following.component";
import {AuthContext} from "../../context/auth/Auth.context";

import "./RightBar.styles.css"

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const RightBar = ({profile}) => {
    const {user: currentUser} = useContext(AuthContext)
    const [followings, setFollowings] = useState([])
    const [isFollowing, setIsFollowing] = useState(false)

    useEffect(() => {
        const fetchFollowings = async () => {
            try {
                const followings = await axios.get(`http://localhost:8080/api/users/${profile?._id}/followings`)
                setFollowings(followings.data)
            } catch (err) {
                console.log(err)
            }
        }

        profile && fetchFollowings()
    }, [profile])


    useEffect(() => {
        setIsFollowing(currentUser.followings.includes(profile?._id))
    }, [currentUser.followings, profile])


    const followHandler = async () => {
        try {
            !isFollowing ? await axios.put(`http://localhost:8080/api/users/${profile._id}/follow`, {userId: currentUser._id}) : await axios.put(`http://localhost:8080/api/users/${profile._id}/unfollow`, {userId: currentUser._id})
        } catch (err) {
            console.log(err)
        }
        setIsFollowing(!isFollowing)
    }


    const HomeRightBar = () => {
        return (
            <div className="unknownContainer">
                <div>
                    <h1>Unknown component</h1>
                    <img className="img" src={`${PF}gift.png`} alt=""/>
                    <span className="text">
                    some text. should go someting
                </span>
                </div>
                <img className="rightbarAd" src="/assets/ad.png" alt=""/>
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    <Online/>
                    <Online/>
                </ul>
            </div>);
    };


    const ProfileRightBar = () => {
        return (<div className="profileRightBarContainer">
            {currentUser.username !== profile.username &&
                <button className="rigthbarFollowingButton" onClick={followHandler}>
                    {isFollowing ? "Unfollow" : "Follow"}
                </button>}
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">{profile.city}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Country:</span>
                    <span className="rightbarInfoValue">{profile.country}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue">Single</span>
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
        </div>);
    };
    return (<div className="rightbar">
        <div className="rightbarWrapper">
            {profile ? <ProfileRightBar/> : <HomeRightBar/>}
        </div>
    </div>);
}

export default RightBar;