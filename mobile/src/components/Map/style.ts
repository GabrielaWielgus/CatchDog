import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../../config/Colors';


export const style = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
      calloutContainer: {
        width: 300,
        height: 100,
    },
      calloutText: {
        fontSize: 12,
        padding: 10,
    },
      boldText: {
        fontWeight: 'bold',
    },
    marker: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: Colors.background_tab_bar,
        borderRadius: 50,
        elevation: 10,
    },
    text: {
        color: Colors.beige,
        textAlign: 'center', 
        fontSize: 12, 
    },
    buttonCloseForm: {
        position: 'absolute',
        top: -5,
        right: -10,
        zIndex: 1,
    },
    pickerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
    },
    styledPicker: {
        flex: 1,
        height: 120,
        backgroundColor: Colors.background_tab_bar,
        borderRadius: 5,
        marginVertical: 5,
        color: Colors.beige,
        justifyContent: 'center',
        marginBottom: 5,
    },
    pageTitle: {
        top: '5%',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.beige,
        marginBottom: 40,
    },
    styledContainer: {
        top: '15%',
        left: '8%',
        width: '85%',
        flex: 1,
        padding: 25,
        borderRadius: 15,
        backgroundColor: Colors.background_tab_bar,
        ...Platform.select({
        android: {
            elevation: 5,
        },
        ios: {
            shadowColor: 'black',
            shadowOffset: { width: 13, height: 30 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
        },
        }),
    },
    innerContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    styledFormArea: {
        width: '100%',
    },
    styledTextInput: {
        backgroundColor: Colors.button_primary,
        paddingLeft: 55,
        paddingRight: 55,
        borderRadius: 5,
        fontSize: 18,
        height: 50,
        marginVertical: 5,
        color: Colors.text_primary,
    },
    styledInputLabel: {
        color: Colors.beige,
        fontSize: 15,
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
    },
    leftIcon: {
        left: 15,
        top: 73,
        position: 'absolute',
        zIndex: 1,
    },
    styledButton: {
        padding: 15,
        backgroundColor: Colors.button_primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginVertical: 5,
        height: 60,
    },
    buttonText: {
        color: Colors.text_primary,
        fontSize: 19,    
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.beige,
        marginVertical: 10,
    },
    messageBox: {
       textAlign: "center",
       fontSize: 13
    }
});
