import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {MoreVert, Cancel} from "@mui/icons-material"
import {format} from "timeago.js";

import {AuthContext} from "../../context/auth/Auth.context";
import PostComment from "../postComment/PostComment.component";
import "./Post.styles.css"

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const Post = ({...post}) => {
    const {user} = useContext(AuthContext)
    const [postAuthor, setPostAuthor] = useState({})
    const [likes, setLikes] = useState(post.likes.length)
    const [commentToAdd, setCommentToAdd] = useState("")
    const [comments, setComments] = useState([])
    const [isLiked, setIsLiked] = useState(false)
    const [isOptsOpened, setIsOptsOpened] = useState(false)
    const [isCommentsUpdated, setIsCommentsUpdated] = useState(false)
    const [isCommentEditMode, setIsCommentEditMode] = useState(false)
    const [commentIdToEdit, setCommentIdToEdit] = useState("")


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


    useEffect(() => {
        const fetchComments = async () => {
            const response = await axios.get(`http://localhost:8080/api/comments/${post._id}`)
            setComments(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
        }

        fetchComments()
    }, [post._id, isCommentsUpdated])


    const likeHandler = () => {
        try {
            axios.put(`http://localhost:8080/api/posts/${post._id}/like`, {userId: user._id})
        } catch (err) {
            console.log(err)
        }
        setIsLiked(!isLiked)
        setLikes(!isLiked ? likes + 1 : likes - 1)
    }


    const postReportHandler = () => {
        setIsOptsOpened(false)
        alert("Report has been recorded!")
    }

    const postDeleteHandler = async () => {
        await axios.delete(`http://localhost:8080/api/posts/${post._id}`, {data: {userId: user._id}})
        setIsOptsOpened(false)
        window.location.reload()
    }

    const postEditHandler = async () => {
        // await axios.put(`http://localhost:8080/api/posts/${post._id}`)
        setIsOptsOpened(false)
    }

    const addCommentHandler = async () => {
        commentToAdd && await axios.post("http://localhost:8080/api/comments/", {text: commentToAdd, authorId: user._id, postId: post._id})
        setCommentToAdd("")
        setIsCommentsUpdated(!isCommentsUpdated)
    }

    const updateCommentHandler = async () => {
        (commentToAdd && isCommentEditMode) && await axios.put(`http://localhost:8080/api/comments/${commentIdToEdit}`, {text: commentToAdd})
        setCommentToAdd("")
        setIsCommentsUpdated(!isCommentsUpdated)
        setIsCommentEditMode(false)
    }

    const editCancelHandler = () => {
        setCommentToAdd("")
        setIsCommentEditMode(false)
    }


    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <Link to={`/profile/${postAuthor.username}`} className="postTopLeft"
                          style={{textDecoration: "none", color: "inherit"}}>
                        <img
                            className="postProfileImg"
                            src={postAuthor.profilePicture ? `http://localhost:8080/api/upload/image/${postAuthor.profilePicture}` : PF + "avatar.png"}
                            alt=""
                        />
                        <span className="postUsername">
                           {postAuthor.username ? postAuthor.username : "Deleted account"}
                        </span>
                    </Link>
                    <div className="postTopRight">
                        <span className="postDate">{format(post.createdAt)}</span>
                        <div className="more-post-options-container">
                            <MoreVert className="postMore-btn" onClick={() => setIsOptsOpened(!isOptsOpened)}/>
                            {
                                isOptsOpened && (
                                    <div className="options-drop">
                                        {
                                            postAuthor.username === user.username && (
                                                <>
                                                    <span className="more-options-item" onClick={postEditHandler}>Edit</span>
                                                    <span className="more-options-item"
                                                          onClick={postDeleteHandler}>Delete</span>
                                                </>
                                            )
                                        }
                                        <span className="more-options-item" onClick={postReportHandler}>Report</span>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    {
                        post.img &&
                        <img className="postImg" src={`http://localhost:8080/api/upload/image/${post.img}`}
                             alt=""/>
                    }
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}images.png`} alt="" onClick={likeHandler}/>
                        <span className="postLikeCounter">{likes}</span>
                    </div>

                </div>
                <hr style={{margin: "8px 0px 8px 0px"}}/>
                <div className="add-comment-container">
                    <div className="add-comment-input">
                        <textarea onChange={(e) => setCommentToAdd(e.target.value)} value={commentToAdd} placeholder="add comment..." className="comment-input"/>
                    </div>
                    <div className="add-comment-input-button-container">
                        <button type="button" className="add-comment-button" onClick={!isCommentEditMode ? addCommentHandler : updateCommentHandler}>{isCommentEditMode ? "edit" : "comment"}</button>
                        {
                            isCommentEditMode && <Cancel className="comment-editMode-cancel-btn" style={{width: "20px"}} onClick={editCancelHandler}/>
                        }
                    </div>
                </div>
                <div className="comments-list">
                    {comments.map((comment) => (
                        <PostComment
                            key={comment._id}
                            comment={comment}
                            updateComments={setIsCommentsUpdated}
                            isCommentsUpdated={isCommentsUpdated}
                            setCommentToEdit={setCommentToAdd}
                            setEditMode={setIsCommentEditMode}
                            setCommentIdToEdit={setCommentIdToEdit}
                            user={user}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Post;