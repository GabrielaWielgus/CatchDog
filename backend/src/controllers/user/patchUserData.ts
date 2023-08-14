import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../utils/CustomError";
import * as HttpStatus from "http-status"
import { UserRepository } from "../../database/repositories/user.repository";
import { getDataFromToken } from "../../utils/auth";
import * as bcrypt from "bcrypt"
import {SALT_ROUNDS} from "../../config/index"

export interface PatchUserDataRequest {
  email: string
  firstName: string
  lastName: string
}

export interface PatchUserDataResponse {
  message: string
}

export const patchUserData = async (req:Request, res:Response, next:NextFunction) => {
  try{
    const {userID} = getDataFromToken(req.headers.authorization.split(" ")[1])
    const data = req.body as PatchUserDataRequest
    
    const user = await UserRepository.findOne({
      where: {
        id: userID
      }
    })

    user.firstName = data.firstName
    user.lastName = data.lastName
    user.email = user.email

    await UserRepository.save(user)
    
    const resData : PatchUserDataResponse = {
      message: "Profile data updated"
    }
    res.status(HttpStatus.OK).json(resData)
  }catch(err){
    next(err)
  }
}
