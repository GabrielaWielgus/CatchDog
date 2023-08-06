
import { chatAPI } from "../API/chatAPI"
import { Chats } from "../redux/features/chats"
import { chatsSlice } from "../redux/features/chats"
import { useAppDispatch } from "../redux/hooks"


export const useFetchChatList = () => {

    const dispatch = useAppDispatch()

    const fetchChatList = async () => {
        try{
            const data = await chatAPI.list.get()
            const chats : Chats = {}
            for(const chat of data.chats)[
                chats[chat.id] = chat
            ]
            dispatch(chatsSlice.actions.set(chats))
        }
        catch(err){
            throw err
        }
    }


    return {
        fetchChatList
    }
}