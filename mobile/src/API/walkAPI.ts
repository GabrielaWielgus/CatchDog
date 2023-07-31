import axios from "axios"
import { endpoints } from "../config/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { GetWalkResponse } from "@backend/controllers/walk/getWalk"
import {PostWalkRequest} from "@backend/controllers/walk/postWalk"
import { PostWalkResponse } from "@backend/controllers/walk/postWalk"
import {DeleteWalkResponse} from "@backend/controllers/walk/deleteWalk"

export const walkAPI = {
    get: async () : Promise<GetWalkResponse> => {
        try{
            const token = await AsyncStorage.getItem("token")
            const response = await axios.get(endpoints.walk.get, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data as GetWalkResponse
        }catch(err){
            throw new Error("Error fetching walks", {
                cause: err
            })
        }
    },
    post: async (data:PostWalkRequest) => {
        try{
            const token = await AsyncStorage.getItem("token")
            const response = await axios.post(endpoints.walk.post, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data as PostWalkResponse
        }catch(err){
            throw new Error("Error posting walk", {
                cause: err
            })
        }
    },
    delete: async (walkID:number) => {
        try{
            const token = await AsyncStorage.getItem("token")
            const response = await axios.delete(endpoints.walk.delete, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    walkID: walkID
                }
            })
            return response.data as DeleteWalkResponse
        }catch(err){
            console.log(err)
            throw new Error("Error deleting walk", {
                cause: err
            })
        }
    }
}