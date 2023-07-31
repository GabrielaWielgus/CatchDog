import {Request, Response, NextFunction} from "express"
import { isTokenValid } from "../utils/auth"
import { CustomError } from "../utils/CustomError"

export const auth = (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization
    if(!authHeader){
        console.log("Auth header missing")
        throw new CustomError("Authorization header missing.", 401)
    }
    const token = authHeader.split(" ")[1]
    if(!token){
        console.log("token missing")
        throw new CustomError("Authorization token missing.", 401)
    }
    const isValid = isTokenValid(token)
    if(isValid === false){
        console.log("token invalid")
        throw new CustomError("Authorization token expired or malformed.", 401)
    }
    next()
}