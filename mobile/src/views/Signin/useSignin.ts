
import { useFormik } from "formik"
import {SigninRequest, SigninResponse} from "@backend/controllers/auth/signin"

import * as Yup from "yup"
import { useState } from "react"
import axios from "axios"
import { endpoints } from "../../config/api"


export const useSignin = () => {
    const [error, setError] = useState("")

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
            }
        }catch(err){
            if(err instanceof axios.AxiosError){
                //setError(err.response?.data.message)
                console.log(err.response?.data)
                if(err.response?.data.errors){
                    console.log(err.response.data.errors)
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