import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../config/Colors';

export const style = StyleSheet.create({
 
  healthRecordTitlePage: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.logo_me,
    marginBottom: 10,
    paddingTop: '2%',
  },
  healthRecordBlurredView: {
    backgroundColor: Colors.beige,
    borderRadius: 20,
    padding: 15,
    //position: 'absolute',
    //top: '45%',
    left: 0,
    right: 0,
    zIndex: 1,
    opacity: 0.9,
    margin: '2%',
  },
  healthRecordContainer: {
    backgroundColor: Colors.background,
    borderRadius: 15,
    padding: 15,
    marginVertical: '2%',
    marginHorizontal: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 }
  },
  dogName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.beige,
    textAlign: 'center',
    flex: 1,
    width: "50%"
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.beige,
    marginHorizontal: 10,
  },
  wrapper: {
    width: '50%',
  },
  healthRecordText: {
    color: Colors.beige,
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  healthRecordImage: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 0,
    marginHorizontal: 0,
  },
})