import axios from "axios"
import { endpoints } from "../config/api"
import { makeProtectedRequest } from "."
import {GetTreatmentResponse} from "@backend/controllers/dog/getTreatment"



export const treatmentAPI = {
    get: async () : Promise<GetTreatmentResponse> => {
      try{
        const response = await makeProtectedRequest("GET", endpoints.treatment.get, null, null)
        if(response.status === 200){
          return response.data
        }else{
          throw new Error("Error fetching treatments")
        }
      }catch(err){
        throw err
      }
    }
}