import { makeProtectedRequest } from "."
import { endpoints } from "../config/api"
import {PatchPasswordRequest, PatchPasswordResponse} from "@backend/controllers/user/patchPassword"
import {PatchUserDataRequest, PatchUserDataResponse} from "@backend/controllers/user/patchUserData"

export const userAPI = {
  password: {
    patch: async (data:PatchPasswordRequest) : Promise<PatchPasswordResponse> => {
      try{
        const response = await makeProtectedRequest("PATCH", endpoints.user.password.patch, data, null)
        return response.data
      }catch(err){
        throw err
      }
    }
  },
  data: {
    patch: async (data:PatchUserDataRequest) : Promise<PatchUserDataResponse> => {
      try{
        const response = await makeProtectedRequest("PATCH", endpoints.user.data.patch, data, null)
        return response.data
      }catch(err){
        throw err
      }
    }
  }
}