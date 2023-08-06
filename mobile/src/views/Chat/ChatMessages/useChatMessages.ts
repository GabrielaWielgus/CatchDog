import { useState } from "react"
import { chatAPI } from "../../../API/chatAPI"
import { useAppSelector } from "../../../redux/hooks"
import { useAppDispatch } from "../../../redux/hooks"
import { chatsSlice } from "../../../redux/features/chats"
import { PostMessageRequest } from "@backend/controllers/chat/message/postMessage"

export const useChatMessages = (chatID:number) => {
    const [totalCount, setTotalCount] = useState(Infinity)
    const [fetching, setFetching] = useState(false)
    const [input, setInput] = useState("")
    const chats = useAppSelector(state => state.chats)
    const dispatch = useAppDispatch()

    const handleInputChange = (text:string) => {
        setInput(text)
    }

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
            console.log(err)
        }
    }

    const handleMessageSend = async () => {
        try{
            if(input.length===0){
                return
            }
            await chatAPI.message.post({chatID, text: input})
            setInput("")
        }catch(err){
            console.log(err)
        }
    }

    return {
        fetchMessages,
        handleInputChange,
        handleMessageSend,
        input
    }
}



