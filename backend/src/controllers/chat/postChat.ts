import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../utils/CustomError";
import * as HttpStatus from "http-status"
import { ChatRepository } from "../../database/repositories/chat.repository";
import { UserRepository } from "../../database/repositories/user.repository";
import { getDataFromToken } from "../../utils/auth";
import { MessageRepository } from "../../database/repositories/message.repository";
import { getSocket, activeUsers, events } from "../../socket";

export interface PostChatRequest {
    otherID: number
}

export interface PostChatResponse {
    message: string
}

export const postChat = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const data = req.body as PostChatRequest
        const {userID}= getDataFromToken(req.headers.authorization.split(" ")[1])

        // Get users to be in the chat
        const user1 = await UserRepository.findOneBy({id: userID})
        const user2 = await UserRepository.findOneBy({id: data.otherID})

        if(!user1 || !user2){
            throw new CustomError("Chat participants do not exist", 400)
        }
        // Check if chat between the two users already exists
        const chats = await ChatRepository.createQueryBuilder('chat')
            .innerJoin('chat.chatters', 'chatter', 'chat.id = chatter.chatId')
            .where('chatter.userId IN (:userID, :otherID)', { userID, otherID: data.otherID})
            .groupBy('chat.id')
            .having('COUNT(DISTINCT chatter.userId) = 2')
            .getMany()
        if(chats && chats.length > 0){
            throw new CustomError("Chat already exists", HttpStatus.CONFLICT)
        }
        // Create chat
        const {chat, chatter1, chatter2} = await ChatRepository.createChatWithChatters(user1, user2)


        // Insert first message
        const _chat = await ChatRepository.findOneBy({id: chat.id})
        const msg = MessageRepository.create({
            chat: _chat,
            data: "Hey lets chat :)",
            sender: user1
        })
        await MessageRepository.save(msg)
        

        // Send socket update
        const receiver = activeUsers.get(data.otherID)
        if(receiver){ 
            const socket = getSocket()
            socket.of("/chat").to(receiver.socketID).emit(events.chat.newChat, {
                message: "New chat created"
            })
        }
        
        const resData : PostChatResponse = {
            message: "Chat created"
        }
        res.status(HttpStatus.CREATED).json(resData)
       
    }catch(err){
        console.log(err)
        next(err)
    }
}