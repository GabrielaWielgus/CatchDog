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
import { WalkUpdate } from '../../redux/features/walks';
import { mapSocket } from '../../socket';
import { useAppDispatch } from '../../redux/hooks';
import { Socket } from 'socket.io-client';
import { walksSlice } from '../../redux/features/walks';
import { useAppSelector } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/native';


const Map = () => {
  const [formVisible, setFormVisible] = useState(false);
  const { tracking, startLocationTracking, stopLocationTracking} = useLocationTracking();
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  useEffect(() => {
    let socket : Socket | undefined
    const socketInit = async () => {
      await mapSocket.connect(user.userID as number)
      socket = mapSocket.get() 
      if(!socket){
        throw new Error("Socket not available")
      }

      socket.on("userDisconnect", (userID:number) => {
        console.log("Someone disconnected")
        dispatch(walksSlice.actions.deleteWalkWithID(userID))
      })

      socket.on("walkUpdate", (data:WalkUpdate) => {
        console.log("Someone's walk update")
        dispatch(walksSlice.actions.setWalkWithID(data))
      })
    }

    socketInit()
    
    return () => {
      socket?.disconnect()
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
