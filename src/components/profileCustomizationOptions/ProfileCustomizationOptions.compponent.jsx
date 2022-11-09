import {useContext, useState} from "react";
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
    const [bannerImg, setBannerImg] = useState(null)
    const [bannerImgURL, setBannerImgURL] = useState("")


    const imageUploadHandler = async () => {


        if (avatarImg) {
            const avatarImgData = new FormData()
            avatarImgData.append("file", avatarImg)
            const {data: {fileId}} = await axios.post("http://localhost:8080/api/upload/", avatarImgData)
            const {data: {response}} = await axios.put(`http://localhost:8080/api/users/${user._id}`, {
                userId: user._id,
                profilePicture: fileId
            })
            updateCurrentUser(response)
        }


        if (bannerImg) {
            const bannerImgData = new FormData()
            bannerImgData.append("file", bannerImg)
            const {data: {fileId}} = await axios.post("http://localhost:8080/api/upload/", bannerImgData)
            const {data: {response}} = await axios.put(`http://localhost:8080/api/users/${user._id}`, {
                userId: user._id,
                coverPicture: fileId
            })
            updateCurrentUser(response)
        }

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
                            <button className="custom-change-btn">save</button>
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
                            <button className="custom-change-btn">save</button>
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
                            <button className="custom-change-btn">save</button>
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
                                <label className="custom-title">Avatar image</label>
                                <span
                                    className="custom-sub-title">Images must be .png .jpg or .jpeg format</span>
                            </div>
                            <button className="custom-change-btn" onClick={imageUploadHandler}>upload</button>
                        </div>
                        <input type="file" accept=".png, .jpeg, .jpg" onChange={avatarChangeHandler}/>
                    </section>


                    <section className="section">
                        <div className="custom-option">
                            <div className="custom-option-titles">
                                <label className="custom-title">Avatar image</label>
                                <span
                                    className="custom-sub-title">Images must be .png .jpg or .jpeg format</span>
                            </div>
                            <button className="custom-change-btn" onClick={imageUploadHandler}>upload</button>
                        </div>
                        <input type="file" accept=".png, .jpeg, .jpg" onChange={bannerChangeHandler}/>
                    </section>
                </div>

            </div>

        </div>

    );
};

export default ProfileCustomizationOptions;