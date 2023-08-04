import { useState } from "react"
import { Message } from "@backend/database/entities/chat/Message"
import { chatAPI } from "../../../API/chatAPI"
import { useChatStackRoute } from "../../../navigators"

export const useChatMessages = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [fetching, setFetching] = useState(false)

    const route = useChatStackRoute()

    const fetch = async () => {
        try{
            const data = await chatAPI.message.get(currentPage, route.params?.chatID as number, 5)
            // TODO update messages
        }catch(err){
            console.log(err)
        }
    }



    return {
    }
}



