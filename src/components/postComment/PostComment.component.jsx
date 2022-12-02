import React, {useState, useEffect} from 'react';
import axios from "axios";
import {format} from "timeago.js";
import {MoreVert} from "@mui/icons-material"

import "./PostComment.styles.css"


const PF = process.env.REACT_APP_PUBLIC_FOLDER
const PostComment = ({comment, updateComments, isCommentsUpdated, setCommentToEdit, setEditMode, setCommentIdToEdit, user}) => {
    const [author, setAuthor] = useState("")
    const [isDropdownOpened, setIsDropdownOpened] = useState(false)


    useEffect(() => {
        const fetchAuthor = async () => {
            const response = await axios.get(`http://localhost:8080/api/users/?userId=${comment.authorId}`)
            setAuthor(response.data)
        }

        fetchAuthor()
    }, [comment])


    const deleteHandler = async () => {
        await axios.delete(`http://localhost:8080/api/comments/${comment._id}`)
        setIsDropdownOpened(false)
        updateComments(!isCommentsUpdated)
        setCommentIdToEdit("")
        setCommentToEdit("")
        setEditMode(false)
    }

    const editHandler = async () => {
        const response = await axios.get(`http://localhost:8080/api/comments/single/${comment._id}`)
        setCommentToEdit(response.data.text)
        setCommentIdToEdit(response.data._id)
        setEditMode(true)
        setIsDropdownOpened(false)
        updateComments(!isCommentsUpdated)
    }

    return (
        <div className="comment">
            <img  src={author.profilePicture ? `http://localhost:8080/api/upload/image/${author.profilePicture}` : PF + "avatar.png"} alt="" className="comments-user-avatar"/>
            <div className="comment-content">
                <div className="comment-content-top">
                    <span className="comment-username">{author.username}</span>
                    <div className="comment-content-top-right">
                        <span className="comment-timeAgo" style={{left: format(comment.createdAt).length < 12 ? "-60px" : "-80px"}}>{format(comment.createdAt)}</span>
                        <MoreVert onClick={() => setIsDropdownOpened(!isDropdownOpened)} className="comment-moreVert"/>
                    </div>
                </div>
                <p className="comment-text">{comment.text}</p>
            </div>
            {
                isDropdownOpened && (
                    <div className="comment-options-dropdown" style={{backgroundColor: (user._id !== author._id) ? "#d0cee0" : ""}}>
                        {
                            (user._id === author._id) && (
                                <>
                                    <div onClick={editHandler}>Edit</div>
                                    <div onClick={deleteHandler}>Delete</div>
                                </>
                            )
                        }
                        <div>Report</div>
                    </div>
                )
            }
        </div>
    )
}

export default PostComment;