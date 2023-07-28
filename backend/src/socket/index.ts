import * as io from "socket.io"
import * as http from "http"
import { auth } from "./middleware/auth"

let socket : io.Server

let mapNamespace : io.Namespace = undefined
let chatNamespace : io.Namespace = undefined

export const events = {
    map: {
        walkUpdate: "walkUpdate",       
        disconnect: "disconnect",       // <-- socket disconnect upon app termination
        userDisconnet: "userDisconnect" // <-- explicit walk termination
    },
    chat: {
        // TBD
    }
}

export const initSocket = (httpServer:http.Server) => {
    socket = new io.Server(httpServer)

    chatNamespace = socket.of("/chat")
    mapNamespace = socket.of("/map")

    // Auth middleware
    socket.use(auth)
    mapNamespace.use(auth)
    chatNamespace.use(auth)

    mapNamespace.on("connection", (socket:io.Socket) => {
        console.log("New connection to map namespace")

        // Register handlers
        socket.on(events.map.walkUpdate, (data) => {
            socket.broadcast.emit(events.map.walkUpdate, data)
        })
        socket.on(events.map.disconnect, (reason:string) => {
            socket.broadcast.emit(events.map.userDisconnet, socket.handshake.query.userID)
        })
        socket.on(events.map.userDisconnet, (userID:number) => {
            socket.broadcast.emit(events.map.userDisconnet, userID)
        })
    })

    

    chatNamespace.on("connection", (socket:io.Socket) => {
        console.log("New connection to chat namespace")
        // Register handlers
        // TBD...
    })

    return socket
}

export const getSocket = () => {
    if(!socket){
        throw new Error("Socket.io not initialized")
    }
    return socket
}