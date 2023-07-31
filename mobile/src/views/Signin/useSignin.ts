
import { useFormik } from "formik"
import {SigninRequest, SigninResponse} from "@backend/controllers/auth/signin"
import { useNavigation } from "@react-navigation/native"
import * as Yup from "yup"
import { useState } from "react"
import axios from "axios"
import { endpoints } from "../../config/api"
import { NavigationParams } from "../../navigators"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { authAPI } from "../../API/authAPI"
import { useAppDispatch } from "../../redux/hooks"
import { userSlice } from "../../redux/features/user"

export const useSignin = () => {
    const [error, setError] = useState("")
    const navigation = useNavigation<NavigationParams>()
    const dispatch = useAppDispatch()

    const initialValues : SigninRequest = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().required('Required')
    })

    const handleSubmit = async (data:SigninRequest) => {
        try{
            const resData = await authAPI.signin(data)
            dispatch(userSlice.actions.set({
                firstName: resData?.firstName,
                lastName: resData?.lastName,
                email: resData?.email,
                userID: resData?.userID
            }))
            navigation.replace("Welcome")
        }catch(err){
            if(err instanceof axios.AxiosError){
                // TODO get the error data  (validation errors etc.)
            }
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit
    })


    return {
        formik, error
    }
}