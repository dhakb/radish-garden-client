import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";


import {AuthContext} from "../../context/auth/Auth.context";
import socket from "../../features/socket";

import TopBar from "../../components/topBar/TopBar.component";
import Conversation from "../../components/conversation/Conversation.component";
import ChatOnline from "../../components/chatOnline/ChatOnline.component";
import Message from "../../components/message/Message.component";

import "./Messenger.styles.css"
import {API_BASE_URL} from "../../constants";



function Messenger({onlineFriends}) {
    const {user: currentUser} = useContext(AuthContext)
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState("")
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [onlineUsers, setOnlineUsers] = useState([])
    const [arrivedMessage, setArrivedMessage] = useState(null)
    const textAreaRef = useRef()
    const scrollRef = useRef()

    useEffect(() => {
        setOnlineUsers(onlineFriends)
    }, [onlineFriends])


    // Receive message from socket
    useEffect(() => {
        socket.on("getMessage", (message) => {
            setArrivedMessage({
                ...message,
                createdAt: Date.now()
            })
        })
    }, [])


    // Update messages according to newly arrived message
    useEffect(() => {
        arrivedMessage && arrivedMessage?.conversationId === currentChat?._id && setMessages((prevState) => [...prevState, arrivedMessage])
    }, [arrivedMessage])


    // Get Conversations from DB
    useEffect(() => {
        const getConversations = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/conversations/${currentUser._id}`)
                setConversations(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        getConversations()
    }, [currentUser._id])


    // Get message from DB
    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/messages/${currentChat._id}`)
                setMessages(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        currentChat && getMessages()
    }, [currentChat])


    // Scroll into latest sent message view
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])



    useEffect(() => {
        const listener = (event) => {
            if (event.key === "Enter") {
                console.log(event.key)
                sendMessageHandler()
            }
        };

        if (textAreaRef.current) {
            textAreaRef.current?.addEventListener("keydown", listener);
        }

        return () => {
            if (textAreaRef.current) {
                textAreaRef.current?.removeEventListener("keydown", listener);
            }
        };

    }, [textAreaRef.current]);

    const sendMessageHandler = async () => {

        const messageToSend = {
            conversationId: currentChat._id,
            sender: currentUser._id,
            text: newMessage
        }

        // Send message via socket.io
        const receiverId = currentChat.members?.find((member) => member !== currentUser._id)
        socket.emit("sendMessage", receiverId, messageToSend)

        // Sent message to DB
        try {
            const response = await axios.post(`${API_BASE_URL}/api/messages/`, messageToSend)
            setMessages([...messages, response.data])
            setNewMessage("")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <TopBar/>

            <div className="messenger">

                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput"/>
                        {
                            conversations.map((convo) => (
                                <div onClick={() => setCurrentChat(convo)} key={convo._id}>
                                    <Conversation conversation={convo} currentUser={currentUser} key={convo._id}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <hr style={{height: "calc(100vh - 70px)", color: "purple"}}/>
                <div className="chatBox">
                    {
                        currentChat ? (<div className="chatBoxWrapper">
                                <div className="chatBoxTop">
                                    <div>
                                        {
                                            messages.map(message => (
                                                <div ref={scrollRef} key={message.createdAt}>
                                                    <Message own={message.sender === currentUser._id} message={message}/>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea className="chatMessageInput" placeholder="Say something..."
                                              onChange={(e) => setNewMessage(e.target.value)}
                                              value={newMessage} ref={textAreaRef}></textarea>
                                    <button className="chatSubmitButton" onClick={sendMessageHandler}>Send</button>
                                </div>
                            </div>)
                            : <span className="noConversationText">Open a chat</span>
                    }

                </div>
                <hr style={{height: "calc(100vh - 70px)", color: "purple"}}/>
                <div className="chatOnline">
                    <span className="online-friends-messenger-title">Online Friends ({onlineUsers?.length ? onlineUsers.length : "0"})</span>
                    <div className="chatOnlineWrapper">
                        <ChatOnline currentUserId={currentUser._id} onlineUsers={onlineUsers} setCurrentChat={setCurrentChat} />
                    </div>
                </div>

            </div>
        </>
    )

}


export default Messenger