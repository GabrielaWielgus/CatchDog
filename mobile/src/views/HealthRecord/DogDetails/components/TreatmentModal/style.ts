import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../../../../config/Colors';

const win = Dimensions.get('window');

export const style = StyleSheet.create({
  buttonCloseForm: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
  },
  pageTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.beige,
    marginBottom: 0,
  },
  styledContainer: {
    position: 'absolute',
    top: '58%',
    left: '8%',
    width: '85%',
    padding: 25,
    borderRadius: 15,
    backgroundColor: Colors.background_tab_bar,
    transform: [{ translateY: -win.height * 0.5 }],
  },
  innerContainer: {
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
    marginVertical: 10,
    width: '70%',
  },
  buttonText: {
    color: Colors.beige,
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: "flex-start",
    width: "100%",
    flex: 1,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: Colors.beige,
    marginRight: 10,
    fontWeight: 'bold',
    paddingBottom: 4,
  },
  inputField: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 10,
    color: Colors.beige,
  },
  dropdown: {
    backgroundColor: Colors.background_tab_bar,
    borderRadius: 10,
    color: Colors.beige,
    width: '100%',
    marginBottom: 15,
  },
  pickerItem: {
    color: Colors.beige,
  },
});
