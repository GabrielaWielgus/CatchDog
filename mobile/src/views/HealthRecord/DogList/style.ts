import { StyleSheet } from 'react-native';
import { Colors } from '../../../config/Colors';

export const style = StyleSheet.create({
  healthRecordViewStyle: {
    backgroundColor: Colors.beige,
    paddingBottom: '17%',
  },
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
    padding: 5,
  },
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
    height: 320,
    borderRadius: 20,
    marginBottom: 0,
    marginHorizontal: 0,
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 20,
    zIndex: 1, 
  },
  Button: {
    position: 'absolute',
    right: 10,
    bottom: 80,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 }
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',backgroundColor: Colors.background_tab_bar,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.beige,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: "15%", 
  },
  bottomSpace: {
    height: "15%", 
  },
})