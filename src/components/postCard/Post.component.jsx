import {useEffect, useState, useContext} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import {MoreVert} from "@mui/icons-material"
import {format} from "timeago.js";

import {AuthContext} from "../../context/auth/Auth.context";

import "./Post.styles.css"

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const Post = ({...post}) => {
    const [postAuthor, setPostAuthor] = useState({})
    const [likes, setLikes] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const {user} = useContext(AuthContext)


    const likeHandler = () => {
        try {
            const response = axios.put(`http://localhost:8080/api/posts/${post._id}/like`,  {userId: user._id})
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


    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${postAuthor.username}`}>
                            <img
                                className="postProfileImg"
                                src={PF + postAuthor.profilePicture}
                                alt=""
                            />
                        </Link>
                        <span className="postUsername">
                           {postAuthor.username}
                     </span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img className="postImg" src={PF + post.img} alt=""/>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}like.png`} alt="" onClick={likeHandler}/>
                        <img className="likeIcon" src={`${PF}heart.png`} alt=""/>
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