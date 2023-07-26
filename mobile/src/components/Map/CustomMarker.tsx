import { View, Text } from 'react-native';
import { style } from "./style";
import { useAppSelector } from '../../redux/hooks';

const CustomMarker = () => {
  const user = useAppSelector(state => state.user)

  return (
    <View style={style.marker}>
      <Text style={style.text}>{user.firstName}</Text>
    </View>
  )
}

export default CustomMarker;
