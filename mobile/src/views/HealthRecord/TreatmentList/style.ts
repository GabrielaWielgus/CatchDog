import { StyleSheet } from 'react-native';
import { Colors } from '../../../config/Colors';

export const style = StyleSheet.create({
    healthRecordViewStyle: {
        backgroundColor: Colors.beige, 
        padding: 20, 
        flex: 1
      },
      subListContainer:{
        backgroundColor: Colors.background,
        padding: 15,
        borderRadius: 20,
        marginHorizontal: 10
      },
      subListItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      subListItemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
      },
      subListItemTitleContainer:{
        borderBottomWidth: 1,
        borderBottomColor: Colors.beige, 
        paddingBottom: 10,
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      subListItemTextContainer: {
        width: '80%',
        flexDirection: 'column',
        alignItems: 'flex-start', 
        flexWrap: 'wrap', 
      },
      subListItemText: {
        fontSize: 14,
        color: Colors.beige,
      },
      rightIcon: {
        marginLeft: 30,
      },
      subListDateText: {
        color: Colors.beige,
        fontSize: 14,
      },
      subListItemTextBold: {
        fontWeight: 'bold', 
      },
    })

    