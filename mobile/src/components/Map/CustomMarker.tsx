import { View, Text } from 'react-native';
import { style } from "./style";

const CustomMarker = () => {
  // credentials context
  //const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  //const {name} = storedCredentials;
  const name = "John Doe"; // Sample name for illustration purposes

  return (
    <View style={style.marker}>
      <Text style={style.text}>{name}</Text>
    </View>
  )
}

export default CustomMarker;
