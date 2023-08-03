import { SafeAreaView } from "react-native"
import { Text } from "react-native"
import { useChatStackRoute } from "../../../navigators"

const ChatMessages = () => {
    const route = useChatStackRoute()

    return(
        <SafeAreaView>
            <Text>ChatMessages {route.params?.chatID}</Text>
        </SafeAreaView>
    )
}


export default ChatMessages
