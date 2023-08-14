import { StyleSheet } from 'react-native';
import { Colors
 } from '../../../config/Colors';
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
        height: "35%",
        width: "100%",
        borderRadius: 20,
    },
    pageTitle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.text_primary,
        margin: 10,
    },
    subTitle: {
        fontSize: 18,
        margin: 20,
        letterSpacing: 1,
        fontWeight: 'bold',
        color: Colors.text_primary,
    },
    styledButton: {
        padding: 15,
        backgroundColor: Colors.button_primary,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        marginVertical: "10%",
        height: 60,
        width: 200,
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
    input: {
        backgroundColor: Colors.button_primary,
        width: "80%",
        height: "6%",
        borderRadius: 20,
        paddingHorizontal: 10,   
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 }
    }
})
