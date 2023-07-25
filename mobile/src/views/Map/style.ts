import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../../config/Colors';

export const style = StyleSheet.create({
  mapViewStyle: {
    flex: 1,
  },
  walkButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startWalk: {
    backgroundColor: Colors.light_green,
  },
  endWalk: {
    backgroundColor: Colors.light_red,
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
  startWalkButton: {
    position: 'absolute',
    right: 10,
    bottom: 80,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  endWalkButton: {
    position: 'absolute',
    right: 10,
    bottom: 80,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.background,
    fontSize: 19,
  },
  addWalk: {
    color: Colors.dark_green,
  },
  endWalkText: {
    color: Colors.dark_red,
  },
});
