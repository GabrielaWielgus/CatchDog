import axios from "axios"
import { endpoints } from "../config/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { GetWalkResponse } from "@backend/controllers/walk/getWalk"
import {PostWalkRequest} from "@backend/controllers/walk/postWalk"
import { PostWalkResponse } from "@backend/controllers/walk/postWalk"
import {DeleteWalkResponse} from "@backend/controllers/walk/deleteWalk"

import { makeProtectedRequest } from "."

export const walkAPI = {
    get: async () : Promise<GetWalkResponse> => {
        try{
            const response = await makeProtectedRequest("GET", endpoints.walk.get)
            return response.data as GetWalkResponse
        }catch(err){
            throw err
        }
    },
    post: async (data:PostWalkRequest) => {
        try{
            const response = await makeProtectedRequest("POST", endpoints.walk.post, data)
            return response.data as PostWalkResponse
        }catch(err){
            throw err
        }
    },
    delete: async (walkID:number) => {
        try{
            const response = await makeProtectedRequest("DELETE", endpoints.walk.delete, null, {
                walkID: walkID
            })
            return response.data as DeleteWalkResponse
        }catch(err){
            throw err
        }
    }
}