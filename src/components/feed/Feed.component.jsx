import {Posts} from "../../DATASET";

import Share from "../share/Share.component"
import Post from "../postCard/Post.component";

import "./Feed.styles.css"

const Feed = () => {
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                {
                    Posts.map(post => (
                        <Post key={post.id} {...post}/>
                    ))
                }
            </div>
        </div>
    );
};

export default Feed;