import { Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { style } from "./style";
import CustomMarker from './CustomMarker';

interface Location {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface MarkerData {
  walkDescription: string;
  onLean: string;
  behavioralDisorders: string;
}

interface props {
  isTracking: boolean;
}

export default function MapContainer({ isTracking, location}: props) {
  const mapRegion = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : null;

  return (
    <MapView style={style.map} region={mapRegion}>
      {isTracking && location && markerData && (
        <Marker
          coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
        >
          <CustomMarker/>
          <Callout style={style.calloutContainer}>
            <Text style={style.calloutText}>
              <Text style={style.boldText}>Walk Description:</Text> {markerData.walkDescription}
              {"\n\n"}
              <Text style={style.boldText}>On Lean:</Text> {markerData.onLean}
              {"\n\n"}
              <Text style={style.boldText}>Dog behavioral disorders:</Text> {markerData.behavioralDisorders}
            </Text>
          </Callout>
        </Marker>
      )}
    </MapView>
  );
}
