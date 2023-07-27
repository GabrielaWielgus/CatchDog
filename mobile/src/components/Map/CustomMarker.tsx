import { View, Text } from 'react-native';
import { style } from "./style";
import { useAppSelector } from '../../redux/hooks';

type props = {
  name: string
}

const CustomMarker = (props:props) => {
  return (
    <View style={style.marker}>
      <Text style={style.text}>{props.name}</Text>
    </View>
  )
}

export default CustomMarker;
