import { FlatList, SafeAreaView, Text, TouchableOpacity, View} from "react-native"
import { style } from "./style"
import { Colors } from "../../config/Colors";
import { Ionicons } from "@expo/vector-icons";

interface ChatData {
    id: number;
    userName: string;
    lastMessage: string;
    date: string;
}

const Chat = () => {
    const chatData = [
        {
            id: 1,
            userName: 'John Doe',
            lastMessage: 'Hello',
            date: '2023-08-01 12:00',
        },
        {
            id: 2,
            userName: 'Moe Doe',
            lastMessage: 'Heeelglooooooooooooooooooooooooooooooooooooooooo',
            date: '2023-08-01 12:00',
        },
    ];

    const renderChats = ({item} : {item: ChatData}) => {
        const MAX_MSG_LENGTH = 33;
        let trimmedMessage = item.lastMessage;

        if(item.lastMessage.length > MAX_MSG_LENGTH) {
            trimmedMessage = item.lastMessage.substring(0, MAX_MSG_LENGTH - 3) + '...';
        }

        return (
            <TouchableOpacity style={style.chatItem}>
                <View style={style.chatBubble}>
                    <Text style={style.title}>{item.userName}</Text>
                    <Text style={style.lastMessage}>{trimmedMessage}</Text>
                    <Text style={style.date}>{item.date}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={style.containerChats}>
                <FlatList
                data={chatData}
                renderItem={renderChats}
                keyExtractor={(item) => item.id.toString()}
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

export default Chat