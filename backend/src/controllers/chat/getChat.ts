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

export interface GetChatResponse {
    chats: Chat[]
}

export const getChat = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {userID} = getDataFromToken(req.headers.authorization.split(" ")[1])

        const chats = await ChatRepository
            .createQueryBuilder('chat')
            .leftJoinAndSelect('chat.chatters', 'chatter') // <-- joinSelect chatters
            .leftJoin('chatter.user', 'user')   // <-- join chatter user
            .addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.email']) // <-- select revelant columns
            .leftJoinAndSelect('chat.messages', 'message') // <-- joinSelect messages
            .leftJoin('message.sender', 'sender')          // <-- join message sender data
            .addSelect(['sender.firstName', 'sender.lastName', 'sender.id', 'sender.email']) // <-- select revelant columns
            .where((qb) => {
                const subQuery = qb
                    .subQuery()
                    .select('chat.id')
                    .from(Chat, 'chat')
                    .innerJoin('chat.chatters', 'chatter')
                    .where('chatter.user.id = :userID', { userID })
                    .getQuery();
                return 'chat.id IN ' + subQuery;
            })
            .orderBy('message.created', 'DESC')
            .getMany();   

        for(const chat of chats){
            chat.messages = chat.messages.slice(0,10)
        }

        const resData : GetChatResponse = {
            chats: chats
        }
        res.status(HttpStatus.OK).json(resData)
    }catch(err){
        console.log(err)
        next(err)
    }
}