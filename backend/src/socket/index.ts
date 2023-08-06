import * as io from "socket.io"
import * as http from "http"
import { auth } from "./middleware/auth"
import { emit } from "process"
import { validate } from "../middleware/validate"

let socket : io.Server

let mapNamespace : io.Namespace = undefined
let chatNamespace : io.Namespace = undefined

interface ActiveUser {
    socketID: string
}
export const activeUsers = new Map<number, ActiveUser>()

export const events = {
    map: {
        walkUpdate: "walkUpdate",       
        disconnect: "disconnect",       // <-- socket disconnect upon app termination
        userDisconnet: "userDisconnect" // <-- explicit walk termination
    },
    chat: {
        disconnect: "disconnect",
        userDisconnect: "userDisconnect",
        newChat: "newChat",
        newMessage: "newMessage"
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
        const userData : ActiveUser = {
            socketID: socket.id
        }
        socket.emit("connected", {socketID: socket.id})
        activeUsers.set(Number(socket.handshake.query.userID), userData)
        activeUsers.forEach((value, key) => {
            console.log(key)
            console.log(value)
        })
        // Register handlers
        socket.on(events.chat.disconnect, () => {
            console.log("User connection terminated")
            activeUsers.delete(Number(socket.handshake.query.userID))
        })
        socket.on(events.chat.userDisconnect, () => {
            console.log("User disconnected from chat namespace")
            activeUsers.delete(Number(socket.handshake.query.userID))
        })
    })

    return socket
}

export const getSocket = () => {
    if(!socket){
        throw new Error("Socket.io not initialized")
    }
    return socket
}