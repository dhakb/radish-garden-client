import {useContext, useState} from "react";
import {Cancel} from "@mui/icons-material"
import axios from "axios";

import {AuthContext} from "../../context/auth/Auth.context";

import "./ProfileCustomizationOptions.styles.css"

const ProfileCustomizationOptions = () => {
    const {user, updateCurrentUser} = useContext(AuthContext)
    const [updatedDesc, setUpdatedDesc] = useState("")
    const [updatedLocation, setUpdatedLocation] = useState("")
    const [updatedDimension, setUpdatedDimension] = useState("")
    const [avatarImg, setAvatarImg] = useState(null)
    const [avatarImgURL, setAvatarImgURL] = useState("")
    const [bannerImg, setBannerImg] = useState("")
    const [bannerImgURL, setBannerImgURL] = useState("")


    const imageUpdateHandler = async () => {

        if (avatarImg) {
            const avatarImgData = new FormData()
            avatarImgData.append("file", avatarImg)
            const {data: {filename}} = await axios.post("https://radish-garden-api.netlify.app/.netlify/functions/index/api/upload/", avatarImgData)
            const {data: {response}} = await axios.put(`https://radish-garden-api.netlify.app/.netlify/functions/index/api/users/${user._id}`, {
                userId: user._id,
                profilePicture: filename
            })

            updateCurrentUser(response)
        }

        if (bannerImg) {
            const bannerImgData = new FormData()
            bannerImgData.append("file", bannerImg)
            const {data: {filename}} = await axios.post("https://radish-garden-api.netlify.app/.netlify/functions/index/api/upload/", bannerImgData)
            const {data: {response}} = await axios.put(`https://radish-garden-api.netlify.app/.netlify/functions/index/api/users/${user._id}`, {
                userId: user._id,
                coverPicture: filename
            })
            updateCurrentUser(response)
        }

    }


    const dimensionUpdateHandler = async () => {
        const {data: {response}} = await axios.put(`https://radish-garden-api.netlify.app/.netlify/functions/index/api/users/${user._id}`, {
            userId: user._id,
            dimension: updatedDimension,
        })
        updateCurrentUser(response)
        setUpdatedDimension("")
    }

    const locationUpdateHandler = async () => {
        const {data: {response}} = await axios.put(`https://radish-garden-api.netlify.app/.netlify/functions/index/api/users/${user._id}`, {
            userId: user._id,
            location: updatedLocation,
        })
        updateCurrentUser(response)
        setUpdatedLocation("")
    }

    const descUpdateHandler = async () => {
        const {data: {response}} = await axios.put(`https://radish-garden-api.netlify.app/.netlify/functions/index/api/users/${user._id}`, {
            userId: user._id,
            desc: updatedDesc,
        })
        updateCurrentUser(response)
        setUpdatedDesc("")
    }


    const avatarChangeHandler = (e) => {
        setAvatarImg(e.target.files[0])
        setAvatarImgURL(URL.createObjectURL(e.target.files[0]))
    }


    const bannerChangeHandler = (e) => {
        setBannerImg(e.target.files[0])
        setBannerImgURL(URL.createObjectURL(e.target.files[0]))
    }

    return (

        <div className="profile-customization-container">
            <h3 className="custom-option-header">Customize Profile</h3>

            <div className="customization-options-wrapper">
                <div className="customization-option">
                    <h4 className="custom-option-subheader">PROFILE INFORMATION</h4>

                    <section className="section">
                        <div className="custom-option">
                            <div className="custom-option-titles">
                                <label htmlFor="desc" className="custom-title">Sentenced desc.</label>
                                <span
                                    className="custom-sub-title">current desc. <i>{user.desc ? user.desc : "no desc available"}</i></span>
                            </div>
                            <button className="custom-change-btn" onClick={descUpdateHandler}>save</button>
                        </div>
                        <input type="text" id="desc" style={{width: "99%", height: "30px"}} value={updatedDesc}
                               onChange={(e) => setUpdatedDesc(e.target.value)}/>
                    </section>

                    <section className="section">
                        <div className="custom-option">
                            <div className="custom-option-titles">
                                <label className="custom-title" htmlFor="location">Location</label>
                                <span
                                    className="custom-sub-title">current location <i>{user.location ? user.location : "unknown"}</i></span>
                            </div>
                            <button className="custom-change-btn" onClick={locationUpdateHandler}>save</button>
                        </div>
                        <input type="text" id="location" style={{width: "99%", height: "30px"}} value={updatedLocation}
                               onChange={(e) => setUpdatedLocation(e.target.value)}/>
                    </section>

                    <section className="section">
                        <div className="custom-option">
                            <div className="custom-option-titles">
                                <label htmlFor="dimension" className="custom-title">Dimension</label>
                                <span
                                    className="custom-sub-title">current dimension <i>{user.dimension ? user.dimension : "unknown"}</i></span>
                            </div>
                            <button className="custom-change-btn" onClick={dimensionUpdateHandler}>save</button>
                        </div>
                        <input type="text" id="dimension" style={{width: "99%", height: "30px"}}
                               value={updatedDimension}
                               onChange={(e) => setUpdatedDimension(e.target.value)}/>
                    </section>
                </div>

                <div className="customization-option">
                    <h4 className="custom-option-subheader">IMAGES</h4>

                    <section className="section">
                        <div className="custom-option">
                            <div className="custom-option-titles">
                                {
                                    avatarImgURL && <div className="upload-image-avatar">
                                        <img src={avatarImgURL} alt="" style={{
                                            width: "60px",
                                            height: "60px",
                                            borderRadius: "50%",
                                            border: "1px solid black"
                                        }}/>
                                        <Cancel className="cancel-avatar" onClick={() => {setAvatarImgURL(""); document.getElementById("avatarImg").value = ""}}/>
                                    </div>
                                }
                                <label className="custom-title">Avatar image</label>
                                <span
                                    className="custom-sub-title">Images must be .png .jpg or .jpeg format</span>
                            </div>
                            <button className="custom-change-btn" onClick={imageUpdateHandler}>upload</button>
                        </div>
                        <input type="file" accept=".png, .jpeg, .jpg" onChange={avatarChangeHandler} id="avatarImg"/>
                    </section>


                    <section className="section">
                        <div className="custom-option">
                            <div className="custom-option-titles">
                                {
                                    bannerImgURL && <div className="upload-image-banner">
                                        <img src={bannerImgURL} alt="" style={{
                                            width: "160px",
                                            height: "50px",
                                            borderRadius: "10px",
                                            border: "1px solid black"
                                        }}/>
                                        <Cancel className="cancel-banner" onClick={() => {setBannerImgURL(""); document.getElementById("bannerImg").value = ""}}/>
                                    </div>
                                }
                                <label className="custom-title">Banner image</label>
                                <span
                                    className="custom-sub-title">Images must be .png .jpg or .jpeg format</span>
                            </div>
                            <button className="custom-change-btn" onClick={imageUpdateHandler}>upload</button>
                        </div>
                        <input type="file" accept=".png, .jpeg, .jpg" onChange={bannerChangeHandler} id="bannerImg"/>
                    </section>
                </div>

            </div>

        </div>

    );
};

export default ProfileCustomizationOptions;