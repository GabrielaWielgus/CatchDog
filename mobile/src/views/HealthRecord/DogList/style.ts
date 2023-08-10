import { StyleSheet } from 'react-native';
import { Colors } from '../../../config/Colors';

export const style = StyleSheet.create({
  healthRecordContainer: {
    backgroundColor: Colors.background,
    borderRadius: 15,
    padding: 15,
    marginTop: '2%',
    marginBottom: '2%',
    marginHorizontal: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 }
  },
  healthRecordTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.beige,
    textAlign: 'center',
    flex: 1,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.beige,
    marginHorizontal: 10,
  },
  healthRecordText: {
    color: Colors.beige,
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  healthRecordImage: {
    width: '100%',
    height: 500,
    borderRadius: 20,
    marginBottom: 0,
    marginHorizontal: 0,
  },
})