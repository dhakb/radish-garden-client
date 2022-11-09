import {Route, Routes} from "react-router-dom";

import TopBar from "../../components/topBar/TopBar.component";
import UserSettingsPreview from "../userSettingsPreview/UserSettingsPreview.component";
import AccountSettingOptions from "../../components/accountSettingOptions/AccountSettingOptions.component";
import ProfileCustomizationOptions
    from "../../components/profileCustomizationOptions/ProfileCustomizationOptions.compponent";
import "./UserSettings.styles.css"

const UserSettings = () => {

    return (
        <div>
            <TopBar/>
            <div className="user-settings-container">
                <Routes>
                    <Route path="/" element={<UserSettingsPreview/>}>
                        <Route path="account" element={<AccountSettingOptions/>}/>
                        <Route path="profile" element={<ProfileCustomizationOptions/>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    );
};

export default UserSettings;