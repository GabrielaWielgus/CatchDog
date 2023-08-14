import { FlatList, SafeAreaView, Text, TouchableOpacity, View} from "react-native"
import { style } from "./style"
import { Colors } from "../../../config/Colors";
import { Ionicons } from "@expo/vector-icons";
import ChatBadge from "./components/ChatBadge";
import { useChatList } from "./useChatList";
import { Chat } from "@backend/database/entities/chat/Chat";
import { useAppSelector } from "../../../redux/hooks";
import { useState } from "react";
import MessageForm from "./components/MessageForm/MessageForm";
import { useEffect } from "react";
import { DateTime } from "luxon";
import { Interval } from "luxon";

const ChatList = () => {
    const {userID} = useAppSelector(state => state.user)
    const {} = useChatList()
    const chats = useAppSelector(state => state.chats)
    const [formVisible, setFormVisible] = useState(false);

    const renderItem = ({item}: {item:Chat}) => {
        return ( 
            <ChatBadge 
                chatID={item.id}
                userName={item.chatters.find(ch => ch.user.id !== userID)?.user.firstName as string} 
                date={item.messages[0].created}
                lastMessage={item.messages[0].data}
            />
        )
    }

    const sortChats = (chats: Chat[]) : Chat[] => {
        return chats.sort((a, b) => {
            const dateA = DateTime.fromISO(a.messages[0].created);
            const dateB = DateTime.fromISO(b.messages[0].created);
    
            if (dateA > dateB) {
                return -1; 
            } else if (dateA > dateB) {
                return 1; 
            } else {
                return 0; 
            }
        })
    }
    
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={style.containerChats}>
            <FlatList
                data={sortChats(Object.values(chats))}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            </View>
            <TouchableOpacity style={style.Button} onPress={() => setFormVisible(true)}>
            <View style={[style.addButton]}>
                <Ionicons name="search" size={24} color={Colors.beige} />
            </View>
            </TouchableOpacity>

        {formVisible && (
            <MessageForm
            close={() => setFormVisible(false)}/>
        )}
        </SafeAreaView>
    )
}

export default ChatList