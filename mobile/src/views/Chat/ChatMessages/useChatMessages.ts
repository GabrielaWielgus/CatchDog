import { useState } from "react"
import { Message } from "@backend/database/entities/chat/Message"
import { chatAPI } from "../../../API/chatAPI"
import { useChatStackRoute } from "../../../navigators"
import { useAppSelector } from "../../../redux/hooks"
import { useAppDispatch } from "../../../redux/hooks"
import { chatsSlice } from "../../../redux/features/chats"

export const useChatMessages = (chatID:number) => {
    const [totalCount, setTotalCount] = useState(Infinity)
    const [fetching, setFetching] = useState(false)
    const chats = useAppSelector(state => state.chats)
    const dispatch = useAppDispatch()

    const fetchMessages = async () => {
        if(totalCount <= chats[chatID].messages.length){
            console.log("No more messages to load")
            return
        }
        try{
            console.log("Fetching")
            const data = await chatAPI.message.get(chats[chatID].messages.length, chatID, 5)
           
            setTotalCount(data.totalCount)
            dispatch(chatsSlice.actions.setChatMessages({
                chatID: chatID,
                messages: data.messages
            }))
        }catch(err){
            console.log("GHEGHEREEF")
            console.log(err)
        }
    }

    return {
        fetchMessages
    }
}



