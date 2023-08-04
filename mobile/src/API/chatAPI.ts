import axios from "axios"
import { endpoints } from "../config/api"
import { SigninRequest } from "@backend/controllers/auth/signin"
import { SigninResponse } from "@backend/controllers/auth/signin"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from "expo-secure-store"
import { SignupRequest } from "@backend/controllers/auth/signup"
import { makeProtectedRequest } from "."
import {GetChatResponse} from "@backend/controllers/chat/getChat"
import {GetMessageResponse, GetMessageRequest} from "@backend/controllers/chat/message/getMessage"

export const chatAPI = {
    list: {
        get: async () : Promise<GetChatResponse> => {
            try{
                const response = await makeProtectedRequest("GET", endpoints.chat.get)
                if(response.status === 200){
                    return response.data
                }else{
                    throw new Error("Error fetching chats")
                }
            }catch(err){
                throw err
            }
        },
        post: async () => {
    
        },
    },
    message: {
        get: async (skip:number, chatID:number, limit:number) : Promise<GetMessageResponse> => {
            try{
                const response = await makeProtectedRequest("GET", endpoints.message.get, null, {
                    chatID: chatID,
                    skip: skip,
                    limit: limit
                })
                if(response.status === 200){
                    return response.data
                }else{
                    throw new Error("Error fetching messages")
                }
            }catch(err){
                throw err
            }
        },
        post: async () => {
    
        }
    }
}