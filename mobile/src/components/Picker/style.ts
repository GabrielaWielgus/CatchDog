import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../../config/Colors';


export const style = StyleSheet.create({
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
    leftIcon: {
        left: 25,
        top: 105,
        position: 'absolute',
        zIndex: 1,
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
});
