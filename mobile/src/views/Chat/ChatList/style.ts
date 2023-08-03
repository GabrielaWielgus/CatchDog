import { Dimensions, StyleSheet } from "react-native"
import { Colors } from "../../../config/Colors"
const win = Dimensions.get("window")

export const style = StyleSheet.create({
    containerChats: {
        flex: 1,
        justifyContent: "center",
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