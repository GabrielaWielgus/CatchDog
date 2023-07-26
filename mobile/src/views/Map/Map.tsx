import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import MapContainer from '../../components/Map/MapContainer';
import WalkForm from './components/WalkForm/WalkForm';
import { Colors } from '../../config/Colors';
import { StatusBar } from 'expo-status-bar';
import useLocationTracking from './hooks/useLocationTracking';
import { style } from "./style";
import { TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react';

const Map = () => {
  const [formVisible, setFormVisible] = useState(false);
  const { tracking, startLocationTracking, stopLocationTracking} = useLocationTracking();

  useEffect(() => {
    
    return () => {
      console.log("Im unmounting")
    }
  }, [])

  return (
    <View style={style.mapViewStyle}>
      <StatusBar style="dark" />
      <MapContainer
        isTracking={tracking}
      />
      {!formVisible && !tracking && (
        <TouchableOpacity style={style.startWalkButton} onPress={() => setFormVisible(true)}>
          <View style={[style.walkButton, style.startWalk]}>
            <Ionicons name="play" size={24} color={Colors.dark_green} />
          </View>
        </TouchableOpacity>
      )}
      {formVisible && (
        <WalkForm 
          close={() => setFormVisible(false)}
          startLocationTracking={startLocationTracking}
        />
      )}
      {tracking && (
        <TouchableOpacity style={style.endWalkButton} onPress={() => {stopLocationTracking()}}>
          <View style={[style.walkButton, style.endWalk]}>
            <Ionicons name="stop" size={24} color={Colors.dark_red} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Map;
