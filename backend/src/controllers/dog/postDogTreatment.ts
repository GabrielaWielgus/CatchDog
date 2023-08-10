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
import { DogTreatment } from "../../database/entities/DogTreatment";
import { TreatmentRepository } from "../../database/repositories/treatment.repository";

export interface PostDogTreatmentRequest {
  dogID: number
  notes: string
  date: string
  controlDate: string
  drugs: string
  treatmentID: number
}

export interface PostDogTreatmentResponse {
  dogTreatment: DogTreatment
}

export const postDogTreatment = async (req:Request, res:Response, next:NextFunction) => {
  try{
    const {userID} = getDataFromToken(req.headers.authorization.split(" ")[1])
    const body = req.body as PostDogTreatmentRequest
    const dog = await DogRepository.findOne({
      where: {id: body.dogID},
      relations: {
        owner: true
      }
    })
    if(!dog){
      throw new CustomError("Dog not found", 400)
    }
    if(dog.owner.id !== userID){
      throw new CustomError("Unauthorized", HttpStatus.FORBIDDEN)
    }
    const treatment = await TreatmentRepository.findOneBy({id: body.treatmentID})

    const dogTreatment = DogTreatmentRepository.create({
      dog: dog,
      notes: body.notes,
      controlDate: body.controlDate,
      date: body.date,
      drugs: body.drugs,
      treatment: treatment
    })
    await DogTreatmentRepository.save(dogTreatment)

    const resData : PostDogTreatmentResponse = {
      dogTreatment: dogTreatment
    }
    res.status(HttpStatus.CREATED).json(resData)
  }catch(err){
    next(err)
  }
}
