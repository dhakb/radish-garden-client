import {useContext, useRef, useState} from "react";
import axios from "axios"
import {Cancel, EmojiEmotions, Label, PermMedia, Room} from "@mui/icons-material"

import "./Share.styles.css"

import {AuthContext} from "../../context/auth/Auth.context";

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const Share = () => {
    const [file, setFile] = useState(null)
    const postInputRef = useRef()
    const {user, user: {_id: userId}} = useContext(AuthContext)

    const submitPostHandler = async (e) => {
        e.preventDefault()
        const newPost = {
            userId,
            desc: postInputRef.current.value,
            // img: file
        }
        try {
            await axios.post("http://localhost:8080/api/posts", newPost)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={user.profilePicture ? `${PF}${user.profilePicture}` : `${PF}avatar.png`} alt=""/>
                    <input
                        placeholder="What's in your mind Safak?"
                        className="shareInput"
                        ref={postInputRef}
                    />
                </div>
                <hr className="shareHr"/>
                {
                    file && (
                        <div className="shareImgContainer">
                            <img src={URL.createObjectURL(file)} className="shareImg" alt="shared image"/>
                            <Cancel className="shareCancelButton" onClick={() => setFile(null)}/>
                        </div>
                    )
                }
                <form className="shareBottom" onSubmit={submitPostHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionText">Photo or Video</span>
                            <input type="file" id="file" accept=".png, .jpeg, .jpg"
                                   onChange={(e) => setFile(e.target.files[0])}
                                   style={{display: "none"}}/>
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    );
};

export default Share;