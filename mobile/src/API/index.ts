
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { endpoints } from "../config/api"
import * as SecureStore from "expo-secure-store"
import {RefreshResponse} from "@backend/controllers/auth/refresh"

export type Method = "GET" | "POST" | "DELETE" | "PUT" | "PATCH"

export const refreshAccessToken = async () => {
    try{
        const refreshToken = await SecureStore.getItemAsync("refreshToken")
        const response = await axios.post(endpoints.auth.refresh, {
            refreshToken: refreshToken
        })
        const data = response.data as RefreshResponse
        await AsyncStorage.setItem("accessToken", data.accessToken)
    }catch(error){
        throw error
    }
}

export const makeProtectedRequest = async (method: Method, url:string, data:any=null, params:any=null) => {
    const apiCall = async () : Promise<any> => {
        try{
            const accessToken = await AsyncStorage.getItem("accessToken")
            const response = await axios({
                method,
                url: url,
                data: data,
                params: params,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return response
        }catch(err){
           throw err
        }
    }

    try{
        const response = await apiCall()
        return response
    }catch(error){
        if(error instanceof axios.AxiosError){
            if(error.response?.status === 401){
                try{
                    await refreshAccessToken()
                    const response = await apiCall()
                    return response
                }catch(error){
                    throw error
                }
            }else{
                throw error
            }
        }else{
            throw error
        }
    }
}