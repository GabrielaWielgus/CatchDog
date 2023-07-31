import * as Yup from "yup"
import { useFormik } from "formik"
import { useAppDispatch } from "../../../../redux/hooks"
import { walksSlice } from "../../../../redux/features/walks"
import { useAppSelector } from "../../../../redux/hooks"
import * as Location from "expo-location"
import { mapSocket } from "../../../../socket"
import {Socket} from "socket.io-client"
import { WalkUpdate } from "../../../../redux/features/walks"
import {DateTime} from "luxon"

export type BehavioralDisorder = "none" | "noiseSensitivity" | "fear" | "aggression"
export type OnLean = "yes" | "no"

export interface FormValues {
    onLean: OnLean
    behavioralDisorder: BehavioralDisorder
    description: string
}

interface props {
    startLocationTracking: () => Promise<void>
    closeForm: () => void
}

export const useWalkForm = (props : props) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    
    const initialValues : FormValues = {
        onLean: "yes",
        behavioralDisorder: "none",
        description: ""
    }
    
    const validationSchema = Yup.object({
        onLean: Yup.string().required(),
        behavioralDisorder: Yup.string().nullable().required(),
        description: Yup.string().required()
    })

    const handleSubmit = async (data:FormValues) => {
        const location = await Location.getCurrentPositionAsync()
        const payload : WalkUpdate = {
            userID: user.userID as number,
            walk: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                description: data.description,
                behavioralDisorder: data.behavioralDisorder,
                onLean: data.onLean,
                userName: user.firstName,
                started: DateTime.now().toISO()
            }
        }
        dispatch(walksSlice.actions.setWalkWithID(payload))
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