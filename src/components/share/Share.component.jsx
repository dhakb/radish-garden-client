import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios"
import {Cancel, EmojiEmotions, Label, PermMedia, Room} from "@mui/icons-material"

import "./Share.styles.css"

import {AuthContext} from "../../context/auth/Auth.context";

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const Share = () => {
    const {user, user: {_id: userId}} = useContext(AuthContext)
    const [avatarImage, setAvatarImage] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [image, setImage] = useState(null)
    const postInputRef = useRef()


    useEffect(() => {
        const fetchAvatarImg = async () => {
            const response = await axios.get(`http://localhost:8080/api/upload/${user.profilePicture}`)
            setAvatarImage(response.data.filename)
        }

        user.profilePicture && fetchAvatarImg()
    }, [user.profilePicture])




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
                const imageResponse = await axios.post("http://localhost:8080/api/upload/", imageData)
                newPost = {...newPost, img: imageResponse.data.fileId ? imageResponse.data.fileId : ""}
            }

            try {
                await axios.post("http://localhost:8080/api/posts", newPost)
            } catch (err) {
                console.log(err)
            }


        } catch (err) {
            console.log(err)
        }



        setImage(null)
        setImageURL("")
        postInputRef.current.value = ""
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
                         src={user.profilePicture ? `http://localhost:8080/api/upload/image/${avatarImage}` : `${PF}avatar.png`} alt=""/>
                    <input
                        placeholder="What's in your mind Safak?"
                        className="shareInput"
                        ref={postInputRef}
                    />
                </div>
                <hr className="shareHr"/>
                {
                    imageURL && (
                        <div className="shareImgContainer">
                            <img src={imageURL} className="shareImg" alt="shared image"/>
                            <Cancel className="shareCancelButton" onClick={() => setImageURL(null)}/>
                        </div>
                    )
                }
                <form className="shareBottom" onSubmit={submitPostHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionText">Photo or Video</span>
                            <input type="file" id="file" accept=".png, .jpeg, .jpg"
                                   onChange={imageChangeHandler}
                                   style={{display: "none"}}/>
                        </label>
                        {/*<div className="shareOption">*/}
                        {/*    <Label htmlColor="blue" className="shareIcon"/>*/}
                        {/*    <span className="shareOptionText">Tag</span>*/}
                        {/*</div>*/}
                        {/*<div className="shareOption">*/}
                        {/*    <Room htmlColor="green" className="shareIcon"/>*/}
                        {/*    <span className="shareOptionText">Location</span>*/}
                        {/*</div>*/}
                        {/*<div className="shareOption">*/}
                        {/*    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>*/}
                        {/*    <span className="shareOptionText">Feelings</span>*/}
                        {/*</div>*/}
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    );
};

export default Share;