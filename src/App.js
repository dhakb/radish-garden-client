import {useContext, useEffect, useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import socket from "./features/socket";
import {AuthContext} from "./context/auth/Auth.context";

import Home from "./views/home/Home.component";
import Login from "./views/login/Login.component";
import Register from "./views/register/Register.page";
import Profile from "./views/profile/Profile.component";
import Messenger from "./views/messenger/Messenger.component";
import UserSettings from "./views/userSettings/UserSettings.component";
import ShowImage from "./components/ShowImage.component";


function App() {
    const [onlineUsers, setOnlineUsers] = useState([])
    const {user} = useContext(AuthContext)

    useEffect(() => {
        socket.connect()
    }, [])

    // // Send user to add into socket server
    // // Get users from socket server
    useEffect(() => {
        socket.emit("addUser", user?._id)
        socket.on("getUsers", onlineUsers => {
            // console.log(onlineUsers)
            setOnlineUsers(user?.followings?.filter(following => onlineUsers?.some(user => user.userId === following)))
        })
    }, [user])

    return (
        <Routes>
            <Route path='/' element={user ? <Home onlineFriends={onlineUsers}/> : <Navigate to="/login"/>}/>
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
            <Route path='/signup' element={<Register/>}/>
            <Route path='/profile/:username' element={user && <Profile/>}/>
            <Route path="/messenger" element={!user ? <Navigate to="/"/> : <Messenger onlineFriends={onlineUsers}/>}/>
            <Route path="/settings/*" element={user && <UserSettings/>}/>
            <Route path="/showImage" element={<ShowImage/>}/>
        </Routes>
    );
}

export default App;
