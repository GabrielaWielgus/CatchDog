import * as io from "socket.io"
import * as jwt from "jsonwebtoken"

export const auth = async (socket: io.Socket, next: (err?: any) => void) => {
    const {token} = socket.handshake.query
    if(!token){
        return next(new Error("Unauthorized"))
    }
    next()
}