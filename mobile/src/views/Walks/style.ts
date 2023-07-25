import { Dimensions, StyleSheet } from "react-native"
import { Colors } from "../../config/Colors"
const win = Dimensions.get("window")

export const style = StyleSheet.create({
  walksViewStyle: {
    flex: 1,
    backgroundColor: Colors.beige,
    paddingBottom: '17%',
  },
  walkTitle: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.logo_me,
    marginBottom: 10,
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    zIndex: 1,
  },
  walkSubtitle: {
    fontSize: 20,
    marginBottom: 20,
    letterSpacing: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.text_primary,
  },
  walkBubble: {
    backgroundColor: Colors.background_tab_bar,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: '2%',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: Colors.beige,
  },
  walkText: {
    color: Colors.background,
    fontSize: 16,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  deleteButton: {
    position: 'absolute',
    top: '50%',
    right: 15,
    zIndex: 1,
  },
  rightIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walksImage: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 0,
    marginHorizontal: 0,
  },
});