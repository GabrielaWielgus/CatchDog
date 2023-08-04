import { useIsFocused } from "@react-navigation/native"
import { useEffect } from "react"
import { chatAPI } from "../../../API/chatAPI"
import { useState } from "react"
import { Chat } from "@backend/database/entities/chat/Chat"
import { useAppSelector } from "../../../redux/hooks"
import { useAppDispatch } from "../../../redux/hooks"
import { chatsSlice } from "../../../redux/features/chats"

export const useChatList = () => {
    const isFocused = useIsFocused()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(isFocused){
            fetchChatList()
        }
    }, [isFocused])

    const fetchChatList = async () => {
        try{
            const data = await chatAPI.list.get()
            for(const chat of data.chats)[
                dispatch(chatsSlice.actions.setChatWithID({
                    chatID: chat.id,
                    chat: chat
                }))
            ]
            console.log(data.chats.length)
        }catch(err){
            // TODO handle errors
        }
    }


    return {
        
    }
}