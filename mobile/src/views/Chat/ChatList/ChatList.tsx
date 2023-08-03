import { FlatList, SafeAreaView, Text, TouchableOpacity, View} from "react-native"
import { style } from "./style"
import { Colors } from "../../../config/Colors";
import { Ionicons } from "@expo/vector-icons";
import ChatBadge from "./components/ChatBadge";
import { props } from "./components/ChatBadge";
import { useChatList } from "./useChatList";
import { Chat } from "@backend/database/entities/chat/Chat";
import { useAppSelector } from "../../../redux/hooks";
import { DateTime } from "luxon";

interface ChatData {
    id: number;
    userName: string;
    lastMessage: string;
    date: string;
}

const ChatList = () => {
    const {userID} = useAppSelector(state => state.user)
    const {chats} = useChatList()

    const renderItem = ({item}: {item:Chat}) => {
        console.log(item.messages[0].created)
        return (
            <ChatBadge 
                chatID={item.id}
                userName={item.chatters.find(ch => ch.user.id !== userID)?.user.firstName as string} 
                date={item.messages[0].created}
                lastMessage={item.messages[0].data}
            />
        )
    }
    
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={style.containerChats}>
            <FlatList
                data={chats}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            </View>
            <TouchableOpacity style={style.Button} onPress={() => {}}>
            <View style={[style.addButton]}>
                <Ionicons name="add" size={24} color={Colors.background} />
            </View>
        </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ChatList