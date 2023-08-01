import { Dimensions, StyleSheet } from "react-native"
import { Colors } from "../../config/Colors"
const win = Dimensions.get("window")

export const style = StyleSheet.create({
    containerChats: {
        flex: 1,
        justifyContent: "center",
    },

    chatItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: '1%',
        left:'15%',
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 }
    },

    chatBubble: {
        backgroundColor: Colors.background,
        borderRadius: 10,
        padding: 10,
        width: win.width * 0.95,
        position: 'relative',
    },

    title: {
        fontSize: 20,
        color: Colors.text_primary,
    },

    lastMessage: {
        fontSize: 14,
        color: Colors.text_placeholder,
    },

    date: {
        position: 'absolute',
        top: '35%',
        right: 10,
        fontSize: 12,
        color: Colors.beige,
    },
    Button: {
        position: 'absolute',
        right: 10,
        bottom: 80,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 }
      },
      addButton: {
        width: 60,
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',backgroundColor: Colors.background_tab_bar,
      },

})