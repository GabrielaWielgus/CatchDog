import { StyleSheet } from "react-native";
import { Colors } from "../../../config/Colors";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.beige,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  treatmentList: {
    marginTop: 10,
    paddingHorizontal: 10
  },
  treatmentItem: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 }
  },
  treatmentText: {
    fontSize: 18,
    color: Colors.beige,
  },
  healthRecordTitlePage: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.logo_me,
    marginBottom: 10,
    paddingTop: '2%',
  },
  healthRecordBlurredView: {
    backgroundColor: Colors.beige,
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    opacity: 0.9,
  },
  healthRecordImage: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 0,
    marginHorizontal: 0,
  },
  backButton: {
    position: "absolute",
    top: '20%',
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
})
