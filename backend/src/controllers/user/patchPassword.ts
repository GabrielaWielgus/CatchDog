import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../utils/CustomError";
import * as HttpStatus from "http-status"
import { UserRepository } from "../../database/repositories/user.repository";
import { getDataFromToken } from "../../utils/auth";
import * as bcrypt from "bcrypt"
import {SALT_ROUNDS} from "../../config/index"

export interface PatchPasswordRequest {
  password: string,
  newPassword: string,
  newPasswordRepeat: string
}

export interface PatchPasswordResponse {
  message: string
}

export const patchPassword = async (req:Request, res:Response, next:NextFunction) => {
  try{
    const {userID} = getDataFromToken(req.headers.authorization.split(" ")[1])
    const data = req.body as PatchPasswordRequest
    
    const user = await UserRepository.findOne({
      where: {id: userID}
    })

    const passwordMatch = await bcrypt.compare(data.password, user.password)
    if(passwordMatch === false){
      throw new CustomError("Unauthorized. Password unchanged", 401)
    }
    
    const newPasswordHash = await bcrypt.hash(data.newPassword, SALT_ROUNDS)
    user.password = newPasswordHash
    await UserRepository.save(user)

    const resData : PatchPasswordResponse = {
      message: "Password changed"
    }
    res.status(HttpStatus.OK).json(resData)
  }catch(err){
    next(err)
  }
}
