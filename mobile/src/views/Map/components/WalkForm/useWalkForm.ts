
import { useState } from "react"
import * as Yup from "yup"
import { useFormik } from "formik"

export type BehavioralDisorders = "none" | "noiseSensitivity" | "fear" | "aggression"
export type OnLean = "yes" | "no"

export interface FormValues {
    onLean: OnLean
    behavioralDisorders: BehavioralDisorders
    walkDescription: string
}

interface props {
    startLocationTracking: () => Promise<void>
    closeForm: () => void
}

export const useWalkForm = (props : props) => {
    
    const initialValues : FormValues = {
        onLean: "yes",
        behavioralDisorders: "none",
        walkDescription: ""
    }
    
    const validationSchema = Yup.object({
        onLean: Yup.string().required(),
        behavioralDisorders: Yup.string().nullable().required(),
        walkDescription: Yup.string().required()
    })

    const handleSubmit = async (data:FormValues) => {
        console.log(data)
        await props.startLocationTracking()
        props.closeForm()
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit
    })

    return {
        formik
    }
}