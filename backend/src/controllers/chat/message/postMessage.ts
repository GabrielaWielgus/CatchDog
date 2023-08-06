import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../utils/CustomError";
import * as HttpStatus from "http-status"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../../config/secret";
import { ChatRepository } from "../../../database/repositories/chat.repository";
import { MessageRepository } from "../../../database/repositories/message.repository";
import { getDataFromToken } from "../../../utils/auth";
import { activeUsers, getSocket } from "../../../socket";

export interface PostMessageRequest {
    chatID: number
    text: string
}

export interface PostMessageResponse {
    message: string
}

export const postMessage = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const data = req.body as PostMessageRequest
        const {userID} = getDataFromToken(req.headers.authorization.split(" ")[1]) 

        const chat = await ChatRepository.findOne({
            where: {id: data.chatID},
            relations: {
                chatters: true
            }
        })
        if(!chat){
            throw new CustomError("Chat does not exist", 400)
        }
        const user = await ChatRepository.findOneBy({id: userID})
        if(!user){
            throw new CustomError("User does not exist", 400)
        }

        const msg = MessageRepository.create({
            chat: chat,
            sender: user,
            data: data.text
        })
        await MessageRepository.save(msg)

        // Socket update
        for(const chatter of chat.chatters){
            const receiver = activeUsers.get(chatter.user.id)
            if(receiver){
                getSocket().of("/chat").to(receiver.socketID).emit("newMessage", {
                    message: msg
                })
            }
        }

        const resData : PostMessageResponse = {
            message: "Message created"
        }
        res.status(HttpStatus.CREATED).json(resData)
    }catch(err){
        next(err)
    }
}