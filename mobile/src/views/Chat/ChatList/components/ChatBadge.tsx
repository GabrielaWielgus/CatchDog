import { TouchableOpacity } from "react-native";
import { style } from "./style";
import { View, Text } from "react-native";
import { useChatStackNavigation } from "../../../../navigators";
import { DateTime } from "luxon";

export interface props {
    lastMessage: string
    date: string
    userName: string
    chatID: number
}

const ChatBadge = (props:props) => {
    const MAX_MSG_LENGTH = 35;
    const navigation = useChatStackNavigation()

    const trimMsg = (msg:string) => {
        return msg.length > MAX_MSG_LENGTH ? msg.substring(0, MAX_MSG_LENGTH - 3) + '...' : msg
    }
    const parseDate = (datetime:string) => {
        const dateTime = DateTime.fromISO(datetime, { zone: 'utc' });

        const date = dateTime.toFormat('yyyy-MM-dd');
        const time = dateTime.toFormat('HH:mm');

        return `${time} ${date}`
    }
        
    const handlePress = () => {
        navigation.navigate("ChatMessages", {
            chatID: props.chatID
        })
    }

    return (
        <TouchableOpacity style={style.chatItem} onPress={handlePress}>
            <View style={style.chatBubble}>
                <Text style={style.title}>{props.userName}</Text>
                <Text style={style.lastMessage}>{trimMsg(props.lastMessage)}</Text>
                <Text style={style.date}>{parseDate(props.date)}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatBadge