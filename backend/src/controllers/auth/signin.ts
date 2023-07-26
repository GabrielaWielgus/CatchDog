import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../database/repositories/user.repository";
import { CustomError } from "../../utils/CustomError";
import * as HttpStatus from "http-status"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../config/secret";


export interface SigninRequest {
    email: string
    password: string
}

export interface SigninResponse {
    token: string
    email: string
    firstName: string
    lastName: string
    userID: number
}

export const signin = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const data = req.body as SigninRequest
        const user = await UserRepository.findOneBy({email: data.email})
        if(!user){
            throw new CustomError("Email does not match any account", HttpStatus.BAD_REQUEST)
        }

        const match = await bcrypt.compare(data.password, user.password)
        if(!match){
            throw new CustomError("Wrong password", HttpStatus.UNAUTHORIZED)
        }
        
        const token = jwt.sign({userID: user.id, email: user.email}, SECRET_KEY)
        const resData : SigninResponse = {
            token: token,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userID: user.id
        }
        res.status(HttpStatus.OK).json(resData)
    }catch(err){
        next(err)
    }
}