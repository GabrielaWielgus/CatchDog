import { useState, useEffect } from "react"
import { Walk } from "@backend/database/entities/Walk"
import { AxiosError } from "axios"
import { useIsFocused } from "@react-navigation/native"
import { Alert } from "react-native"
import { walkAPI } from "../../API/walkAPI"

export const useWalks = () => {
    const [walks, setWalks] = useState<Walk[]>([])
    const [deletingID, setDeletingID] = useState<number | null>(null)
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            console.log("focus in")
            fetchWalks()
        }
    }, [isFocused])

    const fetchWalks = async () => {
        console.log("Fetching")
        try {
            const data = await walkAPI.get()
            setWalks(data.walks)
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    // TODO: Navigate to signin
                    console.log("Unauthorized navigate to signin")
                }
            }
        }
    };

    const deleteWalk = async (walkID: number) => {
        try {
            const data = await walkAPI.delete(walkID)
            let tmp = JSON.parse(JSON.stringify(walks)) as Walk[]
            tmp = tmp.filter(w => w.id !== walkID)
            setWalks(tmp)
            setDeletingID(null)
        } catch (err) {
            console.log(err)
        }
    };

    const handleDelete = (walkID: number) => {
        Alert.alert(
            "Delete Walk",
            "Are you sure you want to delete this walk?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {
                        setDeletingID(walkID);
                        deleteWalk(walkID);
                    },
                },
            ]
        )
    }

    return {
        walks,
        handleDelete,
        deletingID,
    }
}
