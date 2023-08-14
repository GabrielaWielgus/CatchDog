import { StyleSheet } from 'react-native';
import { Colors } from '../../config/Colors';

export const style = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.beige,
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        height: "45%",
        width: "100%",
        borderRadius: 20,
        marginBottom: "5%",
    },
    styledButton: {
        padding: 10,
        backgroundColor: Colors.button_primary,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginVertical: 10,
        height: "12%",
        width: "80%",
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 }
    },
    textButton: {
        color: Colors.text_primary,
        fontSize: 19,
        marginHorizontal: 10,
    },
})
