import {useState} from "react";
import {MoreVert} from "@mui/icons-material"
import {Users} from "../../DATASET";

import "./Post.styles.css"

const Post = ({...post}) => {
    const [like, setLike ] = useState(post.like)
    const [isLiked, setIsLiked] = useState(false)

    const likeHandler = () => {
        setLike((prev) => !isLiked ? prev + 1 : prev -1)
        setIsLiked(!isLiked)
    }


    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img
                            className="postProfileImg"
                            src={Users.find((user) => user.id ===post.userId).profilePicture}
                            alt=""
                        />
                        <span className="postUsername">
                           Lemonot Devilo
                     </span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img className="postImg" src={post.photo} alt=""/>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="/assets/like.png" alt="" onClick={likeHandler}/>
                        <img className="likeIcon" src="/assets/heart.png" alt=""/>
                        <span className="postLikeCounter">{like}</span>
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