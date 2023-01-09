import {io} from "socket.io-client"
import {SOCKET_SERVER} from "../constants";

const socket = io(SOCKET_SERVER, {autoConnect: false})


export default socket