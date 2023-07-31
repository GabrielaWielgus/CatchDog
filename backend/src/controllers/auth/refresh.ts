import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../database/repositories/user.repository";
import { CustomError } from "../../utils/CustomError";
import * as HttpStatus from "http-status"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../config/secret";
import { ACCESS_TOKEN_EXPIRATION } from "../../config";

export interface RefreshRequest {
    refreshToken: string
}

export interface RefreshResponse {
    accessToken: string
}

export interface JWTPayload {
    userID: number
    email: string
}

export const refresh = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const data = req.body as RefreshRequest
        const refreshToken = data.refreshToken

        // Verify token
        const userData = jwt.verify(refreshToken, SECRET_KEY) as JWTPayload
        if(!userData){
            throw new CustomError("Error refreshing token", 401)
        }
        const tokenPaylad : JWTPayload = {
            userID: userData.userID,
            email: userData.email
        }
        const accessToken = jwt.sign(tokenPaylad, SECRET_KEY, {
            expiresIn: ACCESS_TOKEN_EXPIRATION
        })
        const resData : RefreshResponse = {
            accessToken: accessToken
        }
        res.status(HttpStatus.OK).json(resData)
    }catch(err){
        
        next(new CustomError("Error refreshing token", 401))
    }
}