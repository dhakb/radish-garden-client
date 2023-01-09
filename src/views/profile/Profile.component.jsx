import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

import SideBar from "../../components/sideBar/SideBar.component";
import TopBar from "../../components/topBar/TopBar.component"
import Feed from "../../components/feed/Feed.component"
import RightBar from "../../components/rightBar/RightBar.component";

import "./Profile.styles.css"
import {API_BASE_URL} from "../../constants";

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const Profile = () => {
    const [user, setUser] = useState("")
    const {username} = useParams()

    useEffect(() => {
        async function fetchUser() {
            const response = await axios.get(`${API_BASE_URL}/api/users/?username=${username}`)
            setUser(response.data);
        }
        fetchUser();
    }, [username]);


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
                                src={user.coverPicture ? `${API_BASE_URL}/api/upload/${user.coverPicture}` : `${PF}banner.png`}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={user.profilePicture ? `${API_BASE_URL}/api/upload/${user.profilePicture}` : `${PF}avatar.png`}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <RightBar profile={user}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;