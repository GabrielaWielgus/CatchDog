import { Dimensions, StyleSheet } from "react-native"
const win = Dimensions.get("window")

export const style = StyleSheet.create({
    signin: {
        flex: 1
    },
    imageWrapper: {
        height: win.height/2,
        backgroundColor: "red",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        flex: 1,
        alignSelf: "center"
    },
    formWrapper: {
        flex: 1
    }
})