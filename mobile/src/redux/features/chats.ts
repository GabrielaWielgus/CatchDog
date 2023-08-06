import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {Chat} from "@backend/database/entities/chat/Chat"
import { Message } from "@backend/database/entities/chat/Message";

export interface Chats {
    [key: number]: Chat 
}

const initialState: Chats = {}

export interface ChatUpdate {
    chatID: number
    chat: Chat
}

export interface ChatMessageUpdate {
    chatID: number
    messages: Message[]
}

export const chatsSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Chats>) => { 
            return {...state, ...action.payload}
        },
        setChatWithID: (state, action: PayloadAction<ChatUpdate>) => {
            const { chatID, chat } = action.payload;
            state[chatID] = { ...state[chatID], ...chat };
        },
        setChatMessages: (state, action: PayloadAction<ChatMessageUpdate>) => {
            const { chatID, messages } = action.payload;
            const chatMessages = [...state[chatID].messages]
            chatMessages.push(...messages)
            state[chatID] = {...state[chatID], messages: chatMessages}
        },
        insertMessage: (state, action: PayloadAction<{chatID: number, message:Message}>) => {
            const {chatID, message} = action.payload
            const chatMessages = [...state[chatID].messages]
            chatMessages.unshift(message)
            state[chatID] = {...state[chatID], messages: chatMessages}
        }
    }
})

export const {setChatWithID, setChatMessages, set} = chatsSlice.actions
export default chatsSlice.reducer