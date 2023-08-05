import { useState } from "react";
import { chatAPI } from "../../../../../API/chatAPI";
import { User } from "@backend/database/entities/User";
import { useChatStackNavigation } from "../../../../../navigators";
import { useAppDispatch } from "../../../../../redux/hooks";
import { chatsSlice } from "../../../../../redux/features/chats";
import { Chats } from "../../../../../redux/features/chats";

const useMessageForm = (close: () => void) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedItem, setSelectedItem] = useState<User | null>(null);
  
  const dispatch = useAppDispatch()
  const navigation = useChatStackNavigation()

  const handleSearchChange = async (text: string) => {
    setSearchText(text);
    try{
      const data = await chatAPI.users.get(text)
      setSearchResults(data.users)
    }catch(err){
      console.log(err)
    }
  };

  const handleChatCreate = async (otherID:number) => {
    try{
        if(selectedItem){
          await chatAPI.list.post(selectedItem.id)
          const res = await chatAPI.list.get()
          const chats : Chats = {}
          // Update chats redux state <-- replicated code from useChatList ! ! !
          for(const chat of res.chats)[
            chats[chat.id] = chat
          ]
          dispatch(chatsSlice.actions.set(chats))
          close()
        }
        else{
          console.log("Not selected")
        }
    }catch(err){
      console.log(err)
    }
  }

  const handleItemSelected = (item: User) => {
    setSelectedItem(item);
    setSearchText("");
    setSearchResults([]);
  };

  const handleBackspace = () => {
    if (searchText === "") {
      setSelectedItem(null);
      setSearchResults([]);
    }
  };

  const handleUnselect = () => {
    setSelectedItem(null);
    setSearchText("");
  };

  const handleClose = () => {
    close();
  };

  return {
    searchText,
    searchResults,
    selectedItem,
    handleSearchChange,
    handleItemSelected,
    handleBackspace,
    handleUnselect,
    handleClose,
    handleChatCreate
  };
};

export default useMessageForm;
