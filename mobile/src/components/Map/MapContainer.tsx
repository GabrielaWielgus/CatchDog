import { Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { style } from "./style";
import CustomMarker from './CustomMarker';
import { useAppSelector } from '../../redux/hooks';

interface props {
  isTracking: boolean;
}

export default function MapContainer(props:props) {
  const walks = useAppSelector(state => state.walks)  
  const user = useAppSelector(state => state.user)

  let reg = undefined;
  if(walks[user.userID as number]){
    reg = {
      longitude: walks[user.userID as number].longitude, 
      latitude: walks[user.userID as number].latitude,
      latitudeDelta: 5,
      longitudeDelta: 5
    }
  }
  
  return (
    <MapView style={style.map} showsUserLocation={walks[user.userID as number] === undefined} >
      {
      Object.keys(walks).map((userID:any, index) => {
        return (
          <Marker
            key={userID}
            coordinate={{ latitude: walks[userID].latitude, longitude: walks[userID].longitude }}
          >
            <CustomMarker />
            <Callout style={style.calloutContainer}>
              <Text style={style.calloutText}>
                <Text style={style.boldText}>Walk Description: {walks[userID].walkDescription}</Text> 
                {"\n\n"}
                <Text style={style.boldText}>On Lean: {walks[userID].onLean}</Text> 
                {"\n\n"}
                <Text style={style.boldText}>Dog behavioral disorders: {walks[userID].behavioralDisorders}</Text>
              </Text>
            </Callout>
          </Marker>
        )
      })
      }
    </MapView>
  );
}
