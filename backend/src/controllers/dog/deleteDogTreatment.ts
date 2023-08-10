import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../utils/CustomError";
import * as HttpStatus from "http-status"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../config/secret";
import { ACCESS_TOKEN_EXPIRATION } from "../../config";
import { ChatRepository } from "../../database/repositories/chat.repository";
import { UserRepository } from "../../database/repositories/user.repository";
import { getDataFromToken } from "../../utils/auth";
import { Chat } from "../../database/entities/chat/Chat";
import { SelectQueryBuilder } from "typeorm";
import { Message } from "../../database/entities/chat/Message";
import {DogRepository} from "../../database/repositories/dog.repository"
import {Dog} from "../../database/entities/Dog"
import { DogTreatmentRepository } from "../../database/repositories/dogTreatment.repository";

export interface DeleteDogTreatmentRequest {
  dogID: number
  treatmentID: number
}

export interface DeleteDogTreatmentResponse {
  message: string
}

export const deleteDogTreatment = async (req:Request, res:Response, next:NextFunction) => {
  try{
    const {userID} = getDataFromToken(req.headers.authorization.split(" ")[1])
    const params = req.query as unknown as DeleteDogTreatmentRequest
    const dog = await DogRepository.findOne({
      where: {id: params.dogID},
      relations: {
        owner: true
      }
    })
    if(!dog){
      throw new CustomError("Cannot find dog", 400)
    }
    if(dog.owner.id !== userID){
      throw new CustomError("Unauthorized", HttpStatus.FORBIDDEN)
    }

    await DogTreatmentRepository.delete({id: params.treatmentID})

    const resData : DeleteDogTreatmentResponse = {
      message: "Dog treatment deleted"
    }
    res.status(HttpStatus.OK).json(resData)
  }catch(err){
    next(err)
  }
}
