import { StyleSheet } from 'react-native';
import { Colors } from '../../config/Colors';

export const style = StyleSheet.create({
  innerContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  welcomeContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center', // Wyśrodkowanie w poziomie
    paddingTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 10,
  },
  welcomeImage: {
    top: -60,
    height: 500,
    borderRadius: 110,
  },
  pageTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.text_primary,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 20,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: Colors.text_primary,
  },
  styledFormArea: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  styledButton: {
    padding: 15,
    backgroundColor: Colors.button_primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 5,
    height: 60,
    width: 200
  },
  buttonText: {
    color: Colors.background,
    fontSize: 19,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.beige,
    marginVertical: 10,
  },
});
