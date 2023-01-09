import {useContext, useEffect, useState} from "react";
import axios from "axios";

import Share from "../share/Share.component"
import Post from "../post/Post.component";
import {API_BASE_URL} from "../../constants";

import {AuthContext} from "../../context/auth/Auth.context";

import "./Feed.styles.css"

const Feed = ({username}) => {
    const [posts, setPosts] = useState([])
    const {user: {_id: userId, username: currentUsername}} = useContext(AuthContext)

    useEffect(() => {

        const fetchPosts = async () => {
            try {
                const response = username
                    ? await axios.get(`${API_BASE_URL}/api/posts/profile/${username}`)
                    : await axios.get(
                        `${API_BASE_URL}/api/posts/timeline/${userId}`
                    );

                setPosts(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            } catch (err) {
                console.log(err)
            }
        }

        fetchPosts();
    }, [username, userId]);


    return (
        <div className="feed">
            <div className="feedWrapper">

                {
                    username === currentUsername || !username ? <Share/> : ""
                }

                {posts.map(post => (<Post key={post._id} {...post}/>))}
            </div>
        </div>
    );
};

export default Feed;