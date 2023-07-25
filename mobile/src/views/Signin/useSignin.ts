
import { useFormik } from "formik"
import {SigninRequest, SigninResponse} from "@backend/controllers/auth/signin"
import { useNavigation } from "@react-navigation/native"
import * as Yup from "yup"
import { useState } from "react"
import axios from "axios"
import { endpoints } from "../../config/api"
import { NavigationParams } from "../../navigators"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const useSignin = () => {
    const [error, setError] = useState("")
    const navigation = useNavigation<NavigationParams>()

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
            const response = await axios.post(endpoints.auth.signin, data)
            if(response.status === 200){
                const data = response.data as SigninResponse

                await AsyncStorage.setItem("token", data.token)
                await AsyncStorage.setItem("email", data.email)

                navigation.navigate("Welcome")
            }
        }catch(err){
            if(err instanceof axios.AxiosError){
                if(err.response?.data.errors){
                    setError(err.response?.data.errors[0].msg)
                }
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