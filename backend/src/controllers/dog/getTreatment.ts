


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
import { Treatment } from "../../database/entities/Treatment";
import { TreatmentRepository } from "../../database/repositories/treatment.repository";

export interface GetTreatmentResponse {
  treatments: Treatment[]
}

export const getTreatment = async (req:Request, res:Response, next:NextFunction) => {
  try{
    const treatments = await TreatmentRepository.find()
    const resData : GetTreatmentResponse = {
      treatments
    }
    res.status(HttpStatus.OK).json(resData)
  }catch(err){
    next(err)
  }
}

