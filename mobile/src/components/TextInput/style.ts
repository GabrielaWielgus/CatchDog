import { StyleSheet } from 'react-native';
import { Colors } from '../../config/Colors';

export const style = StyleSheet.create({
  textInput: {
    backgroundColor: Colors.button_primary,
    paddingLeft: 55,
    paddingRight: 55,
    borderRadius: 5,
    fontSize: 18,
    height: 50,
    marginBottom: 1,
    color: Colors.text_primary,
    width: "100%"
  },
  inputLabel: {
    color: Colors.text_primary,
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 3,
  },
  leftIconContainer: {
    left: 15,
    top: 30,
    position: 'absolute',
    zIndex: 1,
  },
  rightIconContainer: {
    right: 15,
    top: 30,
    position: 'absolute',
    zIndex: 1,
  },
});