import {Link, useNavigate} from "react-router-dom";

import "./SearchOutputDropdown.styles.css"

const PF = process.env.REACT_APP_PUBLIC_FOLDER


const SearchOutputDropdown = ({users}) => {
    const navigate = useNavigate()

    return (
        <div className="search-output-container">
            {
                users.map(user => (
                        <Link to={`/profile/${user.username}`} className="search-user" key={user._id}
                              onClick={() => navigate(`profile/${user.username}`)}
                              style={{textDecoration: "none", color: "inherit"}}>
                            <img
                                className="search-user-img"
                                src={user.profilePicture ? `https://radish-garden-api.netlify.app/.netlify/functions/index/api/upload/image/${user.profilePicture}` : `${PF}avatar.png`}
                                alt=""/>
                            <span className="search-user-username">{user.username}</span>
                        </Link>
                ))
            }
            {!users.length && <div className="no-user-searchBar">No Users found</div>}
        </div>
    );
};

export default SearchOutputDropdown;