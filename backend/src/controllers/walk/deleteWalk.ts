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

export interface DeleteWalkRequest {
    walkID: number
}

export interface DeleteWalkResponse{
    message: string
}

export const deleteWalk = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const params = req.query as unknown as DeleteWalkRequest
        const {userID} = getDataFromToken(req.headers.authorization.split(" ")[1])
        //const walk = await WalkRepository.findOneBy({id: params.walkID})
        const walk = await WalkRepository.createQueryBuilder("walk")
        .leftJoinAndSelect("walk.user", "user")
        .where("walk.id = :walkID", { walkID: params.walkID })
        .getOne()
        
        if(!walk){
            console.log("1")
            throw new CustomError("Walk does not exist", HttpStatus.NOT_FOUND)
        }
        if(walk.user.id !== userID){
            console.log("2")
            throw new CustomError("Unauthorized", HttpStatus.FORBIDDEN)
        }
        await WalkRepository.delete({id: params.walkID})

        const resData : DeleteWalkResponse = {
            message: "Walk deleted"
        }
        res.status(HttpStatus.OK).json(resData)
    }
    catch(err){
        next(err)
    }
}