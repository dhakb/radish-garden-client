import "./CloseFriend.styles.css"

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const CloseFriend = ({user, navigateToProfile}) => {
    return (
        <li className="sidebarFriend" onClick={navigateToProfile}>
            <img className="sidebarFriendImg" src={user.profilePicture ? `${PF}${user.profilePicture}` : `${PF}avatar.png`} alt="" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    );
};

export default CloseFriend;