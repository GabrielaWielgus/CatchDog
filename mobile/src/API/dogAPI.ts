import axios from "axios"
import { endpoints } from "../config/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { GetWalkResponse } from "@backend/controllers/walk/getWalk"
import {PostWalkRequest} from "@backend/controllers/walk/postWalk"
import { PostWalkResponse } from "@backend/controllers/walk/postWalk"
import {DeleteWalkResponse} from "@backend/controllers/walk/deleteWalk"
import { makeProtectedRequest } from "."
import {GetDogResponse} from "@backend/controllers/dog/getDog"
import {DeleteDogTreatmentRequest, DeleteDogTreatmentResponse} from "@backend/controllers/dog/deleteDogTreatment"

export const dogAPI = {
    get: async () : Promise<GetDogResponse> => {
        try{
            const response = await makeProtectedRequest("GET", endpoints.dog.get)
            return response.data as GetDogResponse
        }catch(err){
            throw err
        }
    },
    post: async () => {

    },

    treatment: {
        post: async () => {

        },
        delete: async (dogID: number, treatmentID: number) : Promise<DeleteDogTreatmentResponse> => {
            try{
                const params : DeleteDogTreatmentRequest = {
                    dogID: dogID,
                    treatmentID: treatmentID
                }
                const response = await makeProtectedRequest("DELETE", endpoints.dog.treatment.delete, null, params)
                if(response.status === 200){
                    return response.data
                }else{
                    throw new Error("Error deleting dog treatment")
                }
            }catch(err){
                throw err
            }
        }
    }
}