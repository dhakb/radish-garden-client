import {Link} from "react-router-dom"

import {API_BASE_URL} from "../../constants";
import "./Following.styles.css"

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const Following = ({following}) => {
    return (
        <Link to={`/profile/${following.username}`} key={following._id}
              style={{textDecoration: "none", color: "inherit"}}>
            <div className="rightbarFollowing">
                <img
                    src={following.profilePicture ? `${API_BASE_URL}/api/upload/${following.profilePicture}` : `${PF}avatar.png`}
                    alt=""
                    className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{following.username}</span>
            </div>
        </Link>
    );
};

export default Following;