import React from "react";
import { SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { View, Text, VirtualizedList } from "react-native";
import { useChatStackRoute } from "../../../navigators";
import { Message } from "@backend/database/entities/chat/Message";
import { useChatMessages } from "./useChatMessages";
import { style } from "./style";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../../../redux/hooks";
import { Colors } from "../../../config/Colors";
import { useChatStackNavigation } from "../../../navigators";

const ChatMessages = () => {
  const route = useChatStackRoute();
  const { fetchMessages, input, handleInputChange, handleMessageSend } = useChatMessages(
    route.params?.chatID as number
  );
  const chats = useAppSelector(state => state.chats);
  const { userID } = useAppSelector(state => state.user);
  const navigation = useChatStackNavigation();

  const renderMessage = ({ item }: { item: Message }) => {
    const isCurrentUser = item.sender.id === userID;

    // Parsowanie daty z formatu przekazywanego przez backend na format "YYYY-MM-DD HH:MM"
    const messageDate = new Date(item.created);
    const formattedDate = `${messageDate.getFullYear()}-${(messageDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${messageDate.getDate().toString().padStart(2, '0')} ${messageDate.getHours()}:${messageDate.getMinutes()}`;

    return (
      <View
        style={[
          style.messageBubble,
          isCurrentUser ? style.currentUserBubble : style.otherUserBubble,
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={style.messageUsername}>{item.sender.firstName}</Text>
        <Text style={style.formattedDate}>{formattedDate}</Text> 
        </View>
        <Text style={style.messageContent}>{item.data}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.fixedTopContainer}>
        <TouchableOpacity style={style.backButton} onPress={() => navigation.navigate("ChatList")}>
          <Ionicons name="arrow-back" size={24} color={Colors.background_tab_bar} />
        </TouchableOpacity>
        <View style={style.userNameContainer}>
          <Text style={style.username}>
            {
              chats[route.params?.chatID as number].chatters.find(
                ch => ch.user.id !== userID
              )?.user.firstName
            }
          </Text>
        </View>
      </View>

      <View style={style.messagesContainer}>
        <VirtualizedList
          data={chats[route.params?.chatID as number].messages}
          initialNumToRender={4}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          getItemCount={messages => messages.length}
          getItem={(messages, index) => messages[index]}
          inverted={true}
          onEndReached={fetchMessages}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          value={input}
          placeholder="Type message..."
          onChangeText={handleInputChange}
        />
        <TouchableOpacity style={style.sendButton} onPress={handleMessageSend}>
          <Ionicons name="send" size={24} color={Colors.background_tab_bar} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatMessages;
