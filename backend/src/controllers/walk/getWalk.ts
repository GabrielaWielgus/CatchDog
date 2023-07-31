import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../utils/CustomError";
import * as HttpStatus from "http-status"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../config/secret";
import { getDataFromToken } from "../../utils/auth";
import { WalkRepository } from "../../database/repositories/walk.repository";
import { UserRepository } from "../../database/repositories/user.repository";
import { Walk } from "../../database/entities/Walk";
import * as luxon from "luxon"


export interface GetWalkResponse {
    walks: Walk[]
}

export const getWalk = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {userID} = getDataFromToken(req.headers.authorization.split(" ")[1])
        const walks = await WalkRepository.find({
            where: {
                user: {id: userID}
            },
            order: {
                id: "DESC"
            }
        })

        const resData : GetWalkResponse = {
            walks: walks
        }

        res.status(HttpStatus.OK).json(resData)
    }catch(err){
        next(err)
    }
}