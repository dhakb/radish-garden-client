import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {MoreVert} from "@mui/icons-material"
import {format} from "timeago.js";

import {AuthContext} from "../../context/auth/Auth.context";

import "./Post.styles.css"

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const Post = ({...post}) => {
    const {user} = useContext(AuthContext)
    const [postAuthor, setPostAuthor] = useState({})
    const [likes, setLikes] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [postImage, setPostImage] = useState("")
    const navigate = useNavigate()


    const likeHandler = () => {
        try {
            axios.put(`http://localhost:8080/api/posts/${post._id}/like`, {userId: user._id})
        } catch (err) {
            console.log(err)
        }
        setIsLiked(!isLiked)
        setLikes(!isLiked ? likes + 1 : likes - 1)
    }

    useEffect(() => {
        setIsLiked(post.likes.includes(user._id))
    }, [user._id])


    useEffect(() => {
        async function fetchUser() {
            const response = await axios.get(`http://localhost:8080/api/users/?userId=${post.userId}`)
            setPostAuthor(response.data)
        }

        fetchUser()
    }, [post.userId])


    // Fetch image from Image collection by fileId
    useEffect(() => {
        async function fetchImage() {
            const response = await axios.get(`http://localhost:8080/api/upload/${post.img}`)
            setPostImage(response.data)
        }

        fetchImage()
    }, [post.img])


    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft"
                         onClick={() => navigate(`profile/${postAuthor.username}`, {replace: true})}>
                        <img
                            className="postProfileImg"
                            src={PF + postAuthor.profilePicture}
                            alt=""
                        />
                        <span className="postUsername">
                           {postAuthor.username}
                        </span>
                    </div>
                    <div className="postTopRight">
                        <span className="postDate">{format(post.createdAt)}</span>
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    {
                        postImage?.filename &&
                        <img className="postImg" src={`http://localhost:8080/api/upload/image/${postImage?.filename}`}
                             alt=""/>
                    }

                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}like.png`} alt="" onClick={likeHandler}/>
                        <span className="postLikeCounter">{likes}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">comments {post.comment}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;