import {useContext} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {AuthContext} from "./context/auth/Auth.context";

import Home from "./views/home/Home.component";
import Login from "./views/login/Login.component";
import Register from "./views/register/Register.page";
import Profile from "./views/profile/Profile.component";
import Messenger from "./views/messenger/Messenger.component";
import ShowImage from "./components/ShowImage.component";

function App() {
    const {user} = useContext(AuthContext)

    return (
        <Routes>
            <Route path='/' element={user ? <Home/> : <Navigate to="/login"/>}/>
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
            <Route path='/signup' element={<Register/>}/>
            <Route path='/profile/:username' element={<Profile/>}/>
            <Route path="/messenger" element={!user ? <Navigate to="/"/> : <Messenger/>}/>
            <Route path="/showImage" element={<ShowImage/>}/>
        </Routes>
    );
}

export default App;
