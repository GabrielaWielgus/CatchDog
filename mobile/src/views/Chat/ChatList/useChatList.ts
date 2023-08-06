import { useIsFocused } from "@react-navigation/native"
import { useEffect } from "react"
import { chatAPI } from "../../../API/chatAPI"
import { useState } from "react"
import { Chat } from "@backend/database/entities/chat/Chat"
import { useAppSelector } from "../../../redux/hooks"
import { useAppDispatch } from "../../../redux/hooks"
import { chatsSlice } from "../../../redux/features/chats"
import {Chats} from "../../../redux/features/chats"
import { chatSocket } from "../../../socket"
import { userSlice } from "../../../redux/features/user"
import { Alert } from "react-native"
import { refreshAccessToken } from "../../../API"
import { useRootStackNavigation } from "../../../navigators"
import { useFetchChatList } from "../../../hooks/useFetchChatList"
import { Socket } from "socket.io-client"
import { Message } from "@backend/database/entities/chat/Message"

export const useChatList = () => {
    const isFocused = useIsFocused()
    const dispatch = useAppDispatch()
    const {userID} = useAppSelector(state => state.user)
    const navigation = useRootStackNavigation()
    const {fetchChatList} = useFetchChatList()

    useEffect(() => {
        if(isFocused){
            fetchChatList()
        }
    }, [isFocused])

    useEffect(() => {
      console.log("Chat component mounted")
      let socket: Socket;

      const init = async () => {
        socket = await chatSocket.connect(userID as number)

        socket.on("newChat", async (data) => {
            console.log("New chat")
            console.log(data)
            await fetchChatList()
        })

        socket.on("newMessage", async (data) => {
          const message = data.message as Message
          dispatch(chatsSlice.actions.insertMessage({
            chatID: message.chat.id,
            message: message
          }))
        })

        socket.on("connect_error", async (err) => {
            socket.disconnect() // <-- stop reconnecting
    
            Alert.alert(
              "Connection error", "Could not connect to maps",
              [
                {text: "Retry", onPress: async ()=>{
                  await refreshAccessToken()
                  await init()
                }},
                {text: "Exit", onPress: ()=>navigation.navigate("Signin")}
              ]
            )
          })
      }
      init()
       

      return () => {
        console.log("Chat component unmounting")
        socket.disconnect()
      }
    }, [])


    return {
        
    }
}