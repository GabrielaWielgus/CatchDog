import * as jwt from "jsonwebtoken"
import { JWTPayload } from "../controllers/auth/signin"
import { SECRET_KEY } from "../config/secret"
import { Request } from "express"

export const isTokenValid = (token:string) : boolean => {
    try{
        const res = jwt.verify(token, SECRET_KEY) as JWTPayload
        return true
    }catch(err){
        return false
    }
}

export const getDataFromToken = (token:string) : JWTPayload | null => {
    try{
        const res = jwt.verify(token, SECRET_KEY) as JWTPayload
        return res
    }catch(err){
        return null
    }
}



