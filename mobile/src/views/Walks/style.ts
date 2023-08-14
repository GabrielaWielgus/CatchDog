import { Dimensions, StyleSheet } from "react-native"
import { Colors } from "../../config/Colors"
const win = Dimensions.get("window")

export const style = StyleSheet.create({
  walksViewStyle: {
    backgroundColor: Colors.beige,
    flex: 1,
    paddingBottom: '17.5%',
  },
  walkTitle: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.logo_me,
    paddingTop: '2%',
  },
  blurredView: {
    backgroundColor: Colors.beige,
    borderRadius: 20,
    padding: 15,
    width: '50%',
    position: 'absolute',
    top: '40%',
    left: '20%',
    right: 0,
    zIndex: 1,
    opacity: 0.8,
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
    backgroundColor: Colors.background,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: '2%',
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 }
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: Colors.beige,
  },
  walkText: {
    color: Colors.beige,
    fontSize: 16,
    marginBottom: 10,
    marginRight:70,
    flexWrap: 'wrap',
  },
  deleteButton: {
    position: 'absolute',
    top: '50%',
    right: 25,
    zIndex: 1,
  },
  rightIcon: {
    width: 35,
    height: 35,
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
  flatList: {
    paddingTop: '2%',
  },
})