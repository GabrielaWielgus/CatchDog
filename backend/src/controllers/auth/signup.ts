import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../database/repositories/user.repository";
import * as HttpStatus from "http-status"
import * as bcrypt from "bcrypt"
import { SALT_ROUNDS } from "../../config";


export interface SignupRequest {
    email: string
    password: string
    passwordRepeat: string
    firstName: string
    lastName: string
}

export const signup = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const data = req.body as SignupRequest
        const user = UserRepository.create({
            email: data.email,
            password: await bcrypt.hash(data.password, SALT_ROUNDS),
            firstName: data.firstName,
            lastName: data.lastName
        })
        await UserRepository.save(user)
        res.status(HttpStatus.CREATED).send()
    }catch(err){
        next(err)
    }
}