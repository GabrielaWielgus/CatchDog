import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../utils/CustomError";
import * as HttpStatus from "http-status"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../../config/secret";
import { ChatRepository } from "../../../database/repositories/chat.repository";
import { MessageRepository } from "../../../database/repositories/message.repository";
import { getDataFromToken } from "../../../utils/auth";
import { Message } from "../../../database/entities/chat/Message";

export interface GetMessageRequest {
    chatID: number
    page: number
    limit: number
}

export interface GetMessageResponse {
    messages: Message[]
    currentPage: number
    totalPages: number
    totalCount: number
}

export const getMessage = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {userID} = getDataFromToken(req.headers.authorization.split(" ")[1]) 
        const data = req.params as unknown as GetMessageRequest;
        const page = data.page || 1; 
        const limit = data.limit || 10; 

        const chat = await ChatRepository.findOne({
            where: {
                id: data.chatID
            },
            relations: {
                chatters: {
                    user: true
                }
            }
        })
        if (!chat) {
            throw new CustomError("Chat does not exist", 400);
        }
        if(chat.chatters.some(chatter => chatter.user.id === userID) === false){
            throw new CustomError("User does not have access to the chat", HttpStatus.FORBIDDEN)
        }
        
        const skip = (page - 1) * limit;
        const [messages, totalCount] = await MessageRepository.findAndCount({
            where: { chat: {id: data.chatID}},
            order: { created: "DESC" }, // order by createdAt in descending order
            skip,
            take: limit,
        });
        
        const totalPages = Math.ceil(totalCount / limit);
        const resData : GetMessageResponse = {
            messages,
            currentPage: page,
            totalPages,
            totalCount
        }
        res.status(HttpStatus.OK).json(resData)
    }catch(err){
        next(err)
    }
}