import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import * as TaskManager from "expo-task-manager"
import { LocationObject } from 'expo-location';
import {TaskManagerTaskBody} from "expo-task-manager"
import { Alert } from 'react-native';
import { useAppDispatch } from '../../../redux/hooks';
import { walksSlice } from '../../../redux/features/walks';
import { store } from '../../../redux/store';
import { Linking } from 'react-native';
import { walk } from '../../../redux/features/walks';
import { useAppSelector } from '../../../redux/hooks';

export const LOCATION_TRACKING = "location-tracking"

TaskManager.defineTask(LOCATION_TRACKING, async (body:TaskManagerTaskBody) => {
  const data = body.data as {locations: LocationObject[]}

  if (body.error) {
    //TODO handle tracking error
    return;
  }
  
  if(data) {  
    const user = store.getState().user
  
    store.dispatch(walksSlice.actions.setWalkWithID({userID: user.userID as number,
      walk: {
        longitude: data.locations[0].coords.longitude,
        latitude: data.locations[0].coords.latitude
    }}))

    // TODO send updated location to server
    const locationUpdate  = {
      userID: user.userID,
      latitude: data.locations[0].coords.latitude,
      longitude: data.locations[0].coords.longitude
    }
    // TODO Socket send 
  }
});


const useLocationTracking = () => {
  const [tracking, setTracking] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)

  useEffect(() => {
    const init = async () => {
      const res = await Location.hasStartedLocationUpdatesAsync(LOCATION_TRACKING)
      setTracking(res)
    }
    init()
  }, [])

  const startLocationTracking = async () => {
    try {
      const foreground = await Location.requestForegroundPermissionsAsync()
      const background = await Location.requestBackgroundPermissionsAsync() // <-- background after foreground

      if(foreground.status === "granted" && background.status === "granted"){
        await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 5000,
          distanceInterval: 0,
        });
        setTracking(true)
      }
      else{
        Alert.alert(
          'Location Permissions',
          'You need to enable location settings',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Settings', onPress: () => Linking.openSettings()}
          ],
        )
      }
    } catch (error) {
      console.error('Error with tracking location:', error);
    }
  };

  const stopLocationTracking = async () => {
    try{
      await Location.stopLocationUpdatesAsync(LOCATION_TRACKING)
      dispatch(walksSlice.actions.deleteWalkWithID(user.userID as number))
      setTracking(false)
    }catch(error){
      console.log(error)
    }
  }

  return { 
    tracking, 
    startLocationTracking,
    stopLocationTracking
  };
};

export default useLocationTracking;
