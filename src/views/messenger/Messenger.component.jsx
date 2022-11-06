import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import {io} from "socket.io-client"

import TopBar from "../../components/topBar/TopBar.component";
import Conversation from "../../components/conversation/Conversation.component";
import ChatOnline from "../../components/chatOnline/ChatOnline.component";
import Message from "../../components/message/Message.component";

import "./Messenger.styles.css"

import {AuthContext} from "../../context/auth/Auth.context";


function Messenger() {
    const {user: currentUser} = useContext(AuthContext)
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState("")
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [onlineUsers, setOnlineUsers] = useState([])
    const [arrivedMessage, setArrivedMessage] = useState(null)
    const socket = useRef()
    const scrollRef = useRef()


    // Establish connection to socket server
    useEffect(() => {
       socket.current = io("ws://localhost:8900")
    }, [])



    // Send user to add into socket server
    // Get users from socket server
    useEffect(() => {
        socket.current.emit("addUser", currentUser._id)
        socket.current.on("getUsers", onlineUsers => {
            setOnlineUsers(currentUser?.followings?.filter(following => onlineUsers?.some(user => user.userId === following)))
        })
    }, [currentUser])

    // Receive message from socket
    useEffect(() => {
        socket.current.on("getMessage", (message) => {

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


    // Get Conversation from DB
    useEffect(() => {
        const getConversations = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/conversations/${currentUser._id}`)
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
                const response = await axios.get(`http://localhost:8080/api/messages/${currentChat._id}`)
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


    const sendMessageHandler = async () => {

        const messageToSend = {
            conversationId: currentChat._id,
            sender: currentUser._id,
            text: newMessage
        }

        // Send message via socket.io
        const receiverId = currentChat.members?.find((member) => member !== currentUser._id)
        socket.current.emit("sendMessage", receiverId, messageToSend)

        // Sent message to DB
        try {
            const response = await axios.post("http://localhost:8080/api/messages/", messageToSend)
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
                                    <textarea className="chatMessageInput" placeholder="write something..."
                                              onChange={(e) => setNewMessage(e.target.value)}
                                              value={newMessage}></textarea>
                                    <button className="chatSubmitButton" onClick={sendMessageHandler}>Send</button>
                                </div>
                            </div>)
                            : <span className="noConversationText">Open a chat</span>
                    }

                </div>

                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline currentUserId={currentUser._id} onlineUsers={onlineUsers} setCurrentChat={setCurrentChat}/>
                    </div>
                </div>

            </div>
        </>
    )

}


export default Messenger