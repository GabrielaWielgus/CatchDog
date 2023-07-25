import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import * as TaskManager from "expo-task-manager"
import { LocationObject } from 'expo-location';
import {TaskManagerTaskBody} from "expo-task-manager"
import { Alert } from 'react-native';

export const LOCATION_TRACKING = "location-tracking"

TaskManager.defineTask(LOCATION_TRACKING, async (body:TaskManagerTaskBody) => {
  if (body.error) {
    //TODO handle tracking error
    return;
  }
  const data = body.data as LocationObject
  if(data) {
    console.log(data)
    //TODO handle location update
  }
});

const useLocationTracking = () => {
  const [tracking, setTracking] = useState<boolean>(false);

  const startLocationTracking = async () => {
    try {
      const foreground = await Location.requestForegroundPermissionsAsync()
      const background = await Location.requestBackgroundPermissionsAsync() // <-- background after foreground

      if(foreground.status === "granted" && background.status === "granted"){
        await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 2000,
          distanceInterval: 0,
        });
        setTracking(true)
      }
      else{
        // TODO Handle insufficient permissions with Modal (Alert.alert)
      }
    } catch (error) {
      console.error('Error with tracking location:', error);
    }
  };

  const stopLocationTracking = async () => {
    try{
      await Location.stopLocationUpdatesAsync(LOCATION_TRACKING)
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
