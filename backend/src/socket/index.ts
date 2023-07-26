import * as io from "socket.io"
import * as http from "http"

import { handleWalkStart } from "./handlers/handleWalkStart"
import { handleWalkUpdate } from "./handlers/handleWalkUpdate"

let socket : io.Server

let mapNamespace : io.Namespace = undefined
let chatNamespace : io.Namespace = undefined

export const events = {
    map: {
        walkStart: "walkStart",
        walkUpdate: "walkUpdate"
    },
    chat: {
        // TBD
    }
}

export const initSocket = (httpServer:http.Server) => {
    socket = new io.Server(httpServer, {
        cors: {

        }
    })
    chatNamespace = socket.of("/chat")
    mapNamespace = socket.of("/map")

    mapNamespace.on("connection", (socket:io.Socket) => {
        console.log("New connection to map namespace")
        // Register handlers
        socket.on(events.map.walkStart, handleWalkStart)
        socket.on(events.map.walkUpdate, handleWalkUpdate)
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