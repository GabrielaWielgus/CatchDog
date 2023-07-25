import { Dimensions, StyleSheet } from "react-native"
import { Colors } from "../../config/Colors"
const win = Dimensions.get("window")

export const style = StyleSheet.create({
    signin: {
        flex: 1
    },
    imageWrapper: {
        height: win.height/2.6,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        flex: 1,
        alignSelf: "center",
        borderRadius: 20
    }, 
    formWrapper: { 
        flex: 1,
        width: win.width,
        alignItems: "center",
        flexDirection: "column",
        paddingHorizontal: 20,
        marginTop: 10
    },
    extraView:{
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 50
    },
    extraText:{
        justifyContent: "center",
        alignItems: "center",
        color: Colors.text_primary,
        fontSize: 15
    },
    textLink:{
        justifyContent: "center",
        alignItems: "center"
    },
    textLinkContent:{
        color: Colors.light_green,
        fontSize: 15,
        marginBottom: 5,
    },
    styledButton:{
        padding: 15,
        backgroundColor: Colors.button_primary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        marginVertical: 5,
        marginBottom: 25,
        height: 60,
        width: 200,
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 }
    },
    textButton:{
        color: Colors.text_primary,
        fontSize: 19
    },
})