import axios from "axios"
import { endpoints } from "../config/api"
import { SigninRequest } from "@backend/controllers/auth/signin"
import { SigninResponse } from "@backend/controllers/auth/signin"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from "expo-secure-store"
import { SignupRequest } from "@backend/controllers/auth/signup"
import { Alert } from "react-native"


export const authAPI = {
    signin: async (data:SigninRequest) : Promise<SigninResponse|undefined> => {
        try{
            const response = await axios.post(endpoints.auth.signin, data)
            if(response.status === 200){
                const data = response.data as SigninResponse
                if("accessToken" in data && "refreshToken" in data && "userID" in data){
                    // Save to async-storage
                    await AsyncStorage.setItem("accessToken", data.accessToken)
                    await AsyncStorage.setItem("email", data.email)
                    await AsyncStorage.setItem("userID", JSON.stringify(data.userID))
                    await AsyncStorage.setItem("firstName", data.firstName)
                    await AsyncStorage.setItem("lastName", data.lastName)
                    // Save to secure-storage
                    await SecureStore.setItemAsync("refreshToken", data.refreshToken)

                    return data
                }else{
                    throw new Error("Error signing in")
                }
            }
        }catch(err){
            throw err
        }
    },
    signup: async(data:SignupRequest) : Promise<void> => {
        try{
            const response = await axios.post(endpoints.auth.signup, data)
            if(response.status === 201){
                Alert.alert("Success", "Your account has been created. Please sign in.")
            }else{
                throw new Error("Error signing up")
            }
        }catch(err){
            throw(err)
        }
    }
}