import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import SideBar from "../../components/sideBar/SideBar.component";
import TopBar from "../../components/topBar/TopBar.component"
import Feed from "../../components/feed/Feed.component"
import RightBar from "../../components/rightBar/RightBar.component";

import "./Profile.styles.css"
import axios from "axios";

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const Profile = () => {
    const [user, setUser] = useState("")
    const [avatarImage, setAvatarImage] = useState("")
    const [bannerImage, setBannerImage] = useState("")
    const {username} = useParams()

    useEffect(() => {
        async function fetchUser() {
            const response = await axios.get(`http://localhost:8080/api/users/?username=${username}`)
            setUser(response.data);
        }
        fetchUser();
    }, [username]);


    useEffect(() => {
        const fetchAvatarImg = async () => {
            const response = await axios.get(`http://localhost:8080/api/upload/${user.profilePicture}`)
            setAvatarImage(response.data.filename)
        }

        user.profilePicture && fetchAvatarImg()
    }, [user.profilePicture])


    useEffect(() => {
        const fetchAvatarImg = async () => {
            const response = await axios.get(`http://localhost:8080/api/upload/${user.coverPicture}`)
            setBannerImage(response.data.filename)
        }

        user.coverPicture && fetchAvatarImg()
    }, [user.coverPicture])



    return (
        <>
            <TopBar/>
            <div className="profile">
                <SideBar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={user.coverPicture ? `http://localhost:8080/api/upload/image/${bannerImage}` : `${PF}banner.png`}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={user.profilePicture ? `http://localhost:8080/api/upload/image/${avatarImage}` : `${PF}avatar.png`}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <RightBar profile={user}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;