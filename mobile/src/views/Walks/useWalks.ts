import { useState } from "react"
import {GetWalkResponse} from "@backend/controllers/walk/getWalk"
import type { Walk } from "@backend/database/entities/Walk"
import { useEffect } from "react"
import { useAppDispatch } from "../../redux/hooks"
import { walkAPI } from "../../API/walkAPI"
import {AxiosError} from "axios"
import { useNavigation } from "@react-navigation/native"

export const useWalks = () => {
    const [walks, setWalks] = useState<Walk[]>([])
    const [deletingID, setDeletingID] = useState<number|null>(null)
    
    useEffect(() => {
        fetchWalks()
    }, [])

    const fetchWalks = async () => {
        console.log("Fetching")
        try{
            const data = await walkAPI.get()
            setWalks(data.walks)
        }catch(err){
            if(err instanceof AxiosError){
                if(err.response?.status === 401){
                    // TODO navigate to signin
                    console.log("Unauthorized navigate to signin")
                }
            }
        }
    }

    const handleDelete = async (walkID:number) => {
        try{
            setDeletingID(walkID)
            const data = await walkAPI.delete(walkID)
            let tmp = JSON.parse(JSON.stringify(walks)) as Walk[]
            tmp = tmp.filter(w => w.id !== walkID)
            setWalks(tmp)
            setDeletingID(null)
        }catch(err){
            console.log(err)
        }
    }

    return {
        walks,
        handleDelete,
        deletingID
    }
}