
import { createStackNavigator } from "@react-navigation/stack";
import ChatMessages from "../views/Chat/ChatMessages/ChatMessages";
import ChatList from "../views/Chat/ChatList/ChatList";
import { Colors } from "../config/Colors";

export type ChatStackParamList = {
    ChatList: undefined
    ChatMessages: {chatID: number}
};

export const ChatStackNavigator = () => {
    const Stack = createStackNavigator<ChatStackParamList>()

    return (
        <Stack.Navigator
            initialRouteName={"ChatList"}
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'transparent',
                },
                headerTintColor: Colors.beige,
                headerTransparent: true,
                headerTitle: '',
                headerLeftContainerStyle: {
                    paddingLeft: 20,
                },
                headerLeft: undefined // null
            }}
        >
            <Stack.Screen 
                name="ChatList"
                component={ChatList}
            />
            <Stack.Screen 
                name="ChatMessages"
                component={ChatMessages}
            />
        </Stack.Navigator>
    )
}


