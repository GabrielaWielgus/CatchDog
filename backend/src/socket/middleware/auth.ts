import * as io from "socket.io"
import * as jwt from "jsonwebtoken"
import { isTokenValid } from "../../utils/auth"
import { CustomError } from "../../utils/CustomError"

export const auth = async (socket: io.Socket, next: (err?: any) => void) => {
    const authHeader = socket.handshake.headers.authorization
    const token = authHeader.split(" ")[1]
    if(!token){
        console.log("token missing")
        return next(new CustomError("Authorization token missing.", 401))
    }
    const isValid = isTokenValid(token)
    if(isValid === false){
        console.log("token invalid")
        return next(new CustomError("Token malformed or expired.", 401))
    }
    next()
}