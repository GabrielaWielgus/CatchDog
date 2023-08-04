import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../../config/Colors";

const win = Dimensions.get("window");

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.beige,
  },
  contentContainer: {
    flex: 1,
  },
  fixedTopContainer: {
    backgroundColor: Colors.beige,
    borderBottomWidth: 2,
    borderBottomColor: Colors.background,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  userNameContainer: {
    alignItems: "center",
    padding: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.background_tab_bar,
  },


  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10, 
    borderTopWidth: 1, 
    borderTopColor: Colors.background,
    backgroundColor: Colors.beige, 
    width: win.width,
    position: "absolute", 
    bottom: 70, 
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    borderBottomColor: Colors.background,
    backgroundColor: Colors.background,
    borderRadius: 20,
    height: 45,
    marginRight: 10,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.beige,
  },


  messagesContainer: {
    paddingHorizontal: 10,
    height: win.height - 250,
    backgroundColor: Colors.beige,
  },
  messageBubble: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  currentUserBubble: {
    alignSelf: "flex-end",
    backgroundColor: Colors.background_tab_bar,
  },
  otherUserBubble: {
    alignSelf: "flex-start",
    backgroundColor: Colors.background,
  },
  messageUsername: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.beige,
  },
  messageContent: {
    color: Colors.beige,
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 20,
    zIndex: 1, 
  },
})

export default style;
