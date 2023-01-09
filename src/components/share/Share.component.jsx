import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios"
import {Cancel, PermMedia} from "@mui/icons-material"

import {API_BASE_URL} from "../../constants";
import {AuthContext} from "../../context/auth/Auth.context";
import "./Share.styles.css"

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const Share = () => {
    const {user, user: {_id: userId}} = useContext(AuthContext)
    const [imageURL, setImageURL] = useState("")
    const [image, setImage] = useState(null)
    const postInputRef = useRef()

    const submitPostHandler = async (e) => {
        e.preventDefault()

        let newPost = {
            userId,
            desc: postInputRef.current.value,
        }


        let imageData = new FormData()
        imageData.append("file", image)

        try {

            if (image) {
                const {data: {filename}} = await axios.post(`${API_BASE_URL}/api/upload/`, imageData)
                newPost = {...newPost, img: filename ? filename : ""}
            }

            try {
                await axios.post(`${API_BASE_URL}/api/posts`, newPost)
            } catch (err) {
                console.log(err)
            }


        } catch (err) {
            console.log(err)
        }



        setImage(null)
        setImageURL("")
        postInputRef.current.value = ""
        window.location.reload()
    }


    const imageChangeHandler = (e) => {
        setImage(e.target.files[0])
        setImageURL(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg"
                         src={user.profilePicture ? `${API_BASE_URL}/api/upload/${user.profilePicture}` : `${PF}avatar.png`} alt=""/>
                    <input
                        placeholder={`What's on my mind?`}
                        className="shareInput"
                        ref={postInputRef}
                    />
                </div>
                <hr className="shareHr"/>
                {
                    imageURL && (
                        <div className="shareImgContainer">
                            <img src={imageURL} className="shareImg" alt="shared image"/>
                            <Cancel className="shareCancelButton" onClick={() => {setImageURL(""); setImage(null)}}/>
                        </div>
                    )
                }
                <form className="shareBottom" onSubmit={submitPostHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="purple" className="shareIcon"/>
                            <span className="shareOptionText">Photo</span>
                            <input type="file" id="file" accept=".png, .jpeg, .jpg"
                                   onChange={imageChangeHandler}
                                   style={{display: "none"}}/>
                        </label>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    );
};

export default Share;