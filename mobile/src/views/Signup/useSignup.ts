
import { useFormik } from "formik"
import {SignupRequest, } from "@backend/controllers/auth/signup"
import * as Yup from "yup"
import { useState } from "react"
import axios from "axios"
import { endpoints } from "../../config/api"
import { authAPI } from "../../API/authAPI"
import { useRootStackNavigation } from "../../navigators"

export const useSignup = () => {
    const [error, setError] = useState("")
    const navigation = useRootStackNavigation()

    const initialValues : SignupRequest = {
        email: "",
        password: "",
        passwordRepeat: "",
        firstName: "",
        lastName: "",
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().required('Required'),
        passwordRepeat: Yup.string().required('Required'),
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
    })

    const handleSubmit = async (data:SignupRequest) => {
        try{
            await authAPI.signup(data)
            navigation.navigate("AppTabNavigator")
        }catch(err){
            if(err instanceof axios.AxiosError){
                if(err.response?.data.errors){
                    console.log(err.response.data.errors)
                    setError(err.response?.data.errors[0].msg)
                }
            }else{
                console.log(err)
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