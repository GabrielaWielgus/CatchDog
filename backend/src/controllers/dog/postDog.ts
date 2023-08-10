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

export interface PostDogRequest {
  name: string
  breed: string
  sex: string
  age: number
}

export interface PostDogResponse {
  dog: Dog
}

export const postDog = async (req:Request, res:Response, next:NextFunction) => {
  try{
    const body = req.body as PostDogRequest
    const {userID} = getDataFromToken(req.headers.authorization.split(" ")[1])

    const owner = await UserRepository.findOneBy({id: userID})

    const dog = DogRepository.create({
      name: body.name,
      sex: body.sex,
      age: body.age,
      breed: body.breed,
      owner: owner
    })
    await DogRepository.save(dog)

    const resData : PostDogResponse = {
      dog: dog
    }
    res.status(HttpStatus.CREATED).json(resData)
  }catch(err){
    next(err)
  }
}
