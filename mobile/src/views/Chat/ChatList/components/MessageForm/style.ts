import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../../../../config/Colors';
const win = Dimensions.get("window")

export const style = StyleSheet.create({
    buttonCloseForm: {
        position: 'absolute',
        top: -5,
        right: -10,
        zIndex: 1,
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
        top: '-30%',
        left: '8%',
        width: '85%',
        flex: 1,
        padding: 25,
        borderRadius: 15,
        backgroundColor: Colors.background_tab_bar,
    },
    innerContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    styledButton: {
        flexDirection: 'row', 
        padding: 15,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginVertical: 5,
        height: '20%',
        width: '70%',
    },
    buttonText: {
        color: Colors.beige,
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 10,  
    },
    searchInput: {
        width: '100%',
        height: 40,
        borderWidth: 0,
        backgroundColor: Colors.beige,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: Colors.text_primary,
    },
    searchResultItem: {
        width: win.width * 0.7,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.background,
        backgroundColor: Colors.background,
        marginHorizontal: 0,
    },
    searchResultItemText:{
        color: Colors.beige,
    },
    selectedUserContainer: {
        width: '100%', 
        paddingVertical: 20, 
        paddingHorizontal: 12,
        borderRadius: 10, 
        backgroundColor: Colors.background,
        margin: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedUserTextBold: {
        color: Colors.beige,
        fontWeight: 'bold',
        fontSize: 18,
    },
    selectedUserText: {
        color: Colors.beige,
        fontSize: 16,
    },
    unselectButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
});
