import { useIsFocused } from "@react-navigation/native"
import { useEffect } from "react"
import { chatAPI } from "../../../API/chatAPI"
import { useState } from "react"
import { Chat } from "@backend/database/entities/chat/Chat"

export const useChatList = () => {
    const [chats, setChats] = useState<Chat[]>()
    const isFocused = useIsFocused()

    useEffect(() => {
        if(isFocused){
            fetchChatList()
        }
    }, [isFocused])

    const fetchChatList = async () => {
        try{
            const data = await chatAPI.get()
            setChats(data.chats)
            console.log(data.chats.length)
        }catch(err){
            // TODO handle errors
        }
    }


    return {
        chats
    }
}