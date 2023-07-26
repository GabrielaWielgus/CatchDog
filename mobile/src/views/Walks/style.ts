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
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.beige,
    paddingTop: '2%',
  },
  blurredView: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 15,
    width: '50%',
    position: 'absolute',
    top: '40%',
    left: '20%',
    right: 0,
    zIndex: 1,
    opacity: 0.9,
    margin: '2%',
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
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 }
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
    height: 250,
    borderRadius: 20,
    marginBottom: 0,
    marginHorizontal: 0,
  },
});