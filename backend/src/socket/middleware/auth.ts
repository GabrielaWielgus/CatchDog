import * as io from "socket.io"
import { isTokenValid } from "../../utils/auth"

export const auth = (socket: io.Socket, next: (err?: any) => void) => {
    const authHeader = socket.handshake.headers.authorization
    if(!authHeader){
        console.log("Auth header missing")
        return next(new Error("Authorization header missing."))
    }
    const token = authHeader.split(" ")[1]
    if(!token){
        console.log("token missing")
        return next(new Error("Authorization token missing."))
    }
    const isValid = isTokenValid(token)
    if(isValid === false){
        console.log("token invalid")
        return next(new Error("Authorization token expired or malformed."))
    }
    next()
}