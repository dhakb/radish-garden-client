import {createPortal} from "react-dom";
import {Fragment} from "react";

const Backdrop = ({onDismiss}) => {
    return <div className="backdrop" onClick={() => onDismiss(false)}></div>
}

const Modal = () => {
    return (
        <div className="post-opts-modal">
            <span>report</span>
            <span>edit</span>
            <span>delete</span>
        </div>
    )
}


const PostOptionsModal = ({onDismiss}) => {
    return (
        <div className="modal-container">
            {
                createPortal(<Backdrop onDismiss={onDismiss}/>, document.getElementById("backdrop-root"))
            }
            {
                createPortal(<Modal/>, document.getElementById("modal-root"))
            }
        </div>
    )
}


export default PostOptionsModal