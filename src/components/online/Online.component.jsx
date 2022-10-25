import "./Online.styles.css"

const Online = () => {
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img className="rightbarProfileImg" src="/assets/person/3.jpeg" alt="" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">User name</span>
        </li>
    );
};

export default Online;