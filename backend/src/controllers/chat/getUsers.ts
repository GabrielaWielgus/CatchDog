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
import { User } from "../../database/entities/User";
import { Chatter } from "../../database/entities/chat/Chatter";
import { Not, ILike } from "typeorm";


export interface GetUsersRequest {
    searchQuery: string
}
export interface GetUsersResponse {
    users: User[]
}



export const getUsers = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const params = req.query as unknown as GetUsersRequest
        const {userID} = getDataFromToken(req.headers.authorization.split(" ")[1])

        const users = await UserRepository.createQueryBuilder("user")
        .select(["user.firstName", "user.lastName", "user.email", "user.id"])
        .where(
            "user.id!= :userID AND (UPPER(user.firstName) LIKE :searchQuery OR UPPER(user.lastName) LIKE :searchQuery OR UPPER(user.email) LIKE :searchQuery)",
            { 
                searchQuery: `%${params.searchQuery}%`,
                userID: userID 
            }
        )
        .andWhere(qb => {
            const subQueryInner = qb    // <-- fetches chats we are involved in
            .subQuery()
            .select('chat.id')
            .from(Chat, 'chat')
            .innerJoin('chat.chatters', 'chatter')
            .where('chatter.user.id = :userID', { userID })
            .getQuery()

            const subQueryOuter = qb.subQuery() // fetches users involved in chat with us
            .select('chatter.user.id')
            .from(Chatter, 'chatter')
            .innerJoin('chatter.user', 'user')
            .where(`chatter.chat.id IN ${subQueryInner}`)
            .getQuery()
           
            return 'user.id NOT IN '+ subQueryOuter
        })
        .getMany();
        

        const resData : GetUsersResponse = {
            users: users
        }
        res.status(HttpStatus.OK).json(resData)
    }catch(err){
        console.log(err)
        next(err)
    }
}