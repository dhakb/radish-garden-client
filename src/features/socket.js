import {io} from "socket.io-client"

const socket = io("http://localhost:46421", {autoConnect: false})


export default socket