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
    marginBottom: 20,
  },
  styledContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%', 
    left: '8%',
    width: '85%',
    padding: 25,
    borderRadius: 15,
    backgroundColor: Colors.background_tab_bar,
    transform: [{ translateY: -win.height * 0.45 }], 
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: Colors.beige,
    marginRight: 10,
    fontWeight: 'bold',
  },
  inputField: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 10,
    color: Colors.beige,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  dropdown: {
    marginVertical: "-20%",
    color: Colors.beige,
    width: '80%',
    height: '50%',
    top: '-26%',
    paddingBottom: "10%",
  },
  pickerItem: {
    color: Colors.beige,
  },
  pickerError: {
    borderColor: 'red',
  },
});
