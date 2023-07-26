
import { useState } from "react"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useAppDispatch } from "../../../../redux/hooks"
import { walksSlice } from "../../../../redux/features/walks"

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
    const dispatch = useAppDispatch()
    
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
        dispatch(walksSlice.actions.setWalkWithID({
            userID: 5,
            walk: {
                lattitude: 0,
                longitude: 0,
                walkDescription: data.walkDescription,
                behavioralDisorders: data.behavioralDisorders,
                userID: 5,
                onLean: data.onLean,
                userName: "Joe"
            }
        }))
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