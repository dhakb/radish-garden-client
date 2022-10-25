import {Route, Routes} from "react-router-dom";

import Home from "./pages/home/Home.component";
import Login from "./pages/login/Login.component";
import Register from "./pages/register/Register.page";

import Profile from "./pages/profile/Profile.component";

function App() {
    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Register/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/profile' element={<Profile/>}/>
        </Routes>
    );
}

export default App;
