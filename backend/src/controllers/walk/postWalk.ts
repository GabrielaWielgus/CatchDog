import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../utils/CustomError";
import * as HttpStatus from "http-status"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../config/secret";
import { getDataFromToken } from "../../utils/auth";

import * as luxon from "luxon"

import { UserRepository } from "../../database/repositories/user.repository";
import { WalkRepository } from "../../database/repositories/walk.repository";

export interface PostWalkRequest {
    behavioralDisorder: string
    onLean: string
    description: string
    started: string
    ended: string
}

export interface PostWalkResponse {
    message: string
}

export const postWalk = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {userID} = getDataFromToken(req.headers.authorization.split(" ")[1])
        const data = req.body as PostWalkRequest

        const user = await UserRepository.findOneBy({id: userID})
        if(!user){
            throw new CustomError("User does not exist", 400)
        }
        const walk = WalkRepository.create({
            description: data.description,
            behavioralDisorder: data.behavioralDisorder,
            onLean: data.onLean,
            user: user,
            started: data.started,
            ended: data.ended
        })
        await WalkRepository.save(walk)

        const resBody : PostWalkResponse = {
            message: "Walk created"
        }
        res.status(HttpStatus.CREATED).json(resBody)
    }catch(err){
        next(err)
    }
}