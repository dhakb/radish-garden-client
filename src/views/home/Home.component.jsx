import {Fragment} from 'react';
import TopBar from "../../components/topBar/TopBar.component";
import SideBar from "../../components/sideBar/SideBar.component";
import RightBar from "../../components/rightBar/RightBar.component";
import Feed from "../../components/feed/Feed.component"

import "./Home.styles.css"

const Home = ({onlineFriends}) => {
    return (
        <Fragment>
            <TopBar/>
            <div className="homeContainer">
                <SideBar/>
                <Feed/>
                <RightBar onlineFriends={onlineFriends}/>
            </div>
        </Fragment>
    );
};

export default Home;