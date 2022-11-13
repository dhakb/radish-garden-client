import {useContext, useState} from "react";

import {AuthContext} from "../../context/auth/Auth.context";

import AccountUpdateModal from "../UI/AccountUpdateModal/AccountUpdateModal.component";
import UserNameUpdateForm from "../usernameUpdateForm/UserNameUpdateForm.component";
import PasswordUpdateForm from "../passwordUpdateForm/PasswordUpdateForm.component";

import "./AccountSettingOptions.styles.css"


const AccountSettingOptions = () => {
    const [isChangingUsername, setIsChangingUsername] = useState(false)
    const [isChangingPassword, setIsChangingPassword] = useState(false)

    const {user} = useContext(AuthContext)


    return (
        <div className="account-setting-options-container">
            <h3 className="option-header">Account settings</h3>
            <section>
                <h4 className="option-subheader">ACCOUNT PREFERENCES</h4>
                <div className="option">
                    <div className="option-titles">
                        <span className="title">Change username</span>
                        <span className="sub-title">current username <i>{user.username}</i></span>
                    </div>
                    <button className="change-btn" onClick={() => setIsChangingUsername(!isChangingUsername)}>save
                    </button>
                </div>
                <div className="option">
                    <div className="option-titles">
                        <span className="title">Change password</span>
                        <span className="sub-title">Password must be at least 8 characters long</span>
                    </div>
                    <button className="change-btn" onClick={() => setIsChangingPassword(true)}>save</button>
                </div>
            </section>

            <section>

            </section>


            {
                isChangingUsername && <AccountUpdateModal onDismiss={setIsChangingUsername}
                                                          isOpened={isChangingUsername}>
                    <UserNameUpdateForm onModalClose={setIsChangingUsername}/>
                </AccountUpdateModal>
            }
            {
                isChangingPassword && <AccountUpdateModal onDismiss={setIsChangingPassword}>
                    <PasswordUpdateForm onModalClose={setIsChangingPassword}/>
                </AccountUpdateModal>
            }
        </div>
    );
};

export default AccountSettingOptions;