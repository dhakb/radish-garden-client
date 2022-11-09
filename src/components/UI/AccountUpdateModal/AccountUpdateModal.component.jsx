import {Fragment} from "react";
import {createPortal} from "react-dom";

import "./AccountUpdateModal.styles.css"


const Backdrop = ({onDismiss}) => {
    return <div className="backdrop" onClick={() => onDismiss(false)}></div>
}


const Modal = ({children}) => {
    return (
        <div className="modal">
            {children}
        </div>
    )
}


const AccountUpdateModal = ({onDismiss, children}) => {
    return (
        <Fragment>
            {
                createPortal(<Backdrop onDismiss={onDismiss}/>, document.getElementById("backdrop-root"))
            }
            {
                createPortal(<Modal children={children}/>, document.getElementById("modal-root"))
            }
        </Fragment>
    );
};

export default AccountUpdateModal;