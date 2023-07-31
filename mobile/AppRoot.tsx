import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { useState } from 'react';
import { AppNavigator } from './src/navigators/AppNavigator';
import * as SplashScreen from "expo-splash-screen"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackParamList } from './src/navigators/AppNavigator';
import { useAppDispatch } from './src/redux/hooks';
import { userSlice } from './src/redux/features/user';

SplashScreen.preventAutoHideAsync() // <-- called in global scope as recommended in docs

const AppRoot = () => {
  const [appReady, setAppReady] = useState(false)
  const [initialRoute, setInitialRoute] = useState<keyof StackParamList>("Signin")
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    const init = async () => {
      //await AsyncStorage.clear()
      try{
        const accessToken = await AsyncStorage.getItem("accessToken")
        const email = await AsyncStorage.getItem("email")
        const firstName = await AsyncStorage.getItem("firstName")
        const lastName = await AsyncStorage.getItem("lastName")
        const userID = await AsyncStorage.getItem("userID")

        if(!accessToken || !email || !userID || !firstName || !lastName){
          setInitialRoute("Signin")
        }else{
          dispatch(userSlice.actions.set({
            email: email,
            firstName: firstName,
            lastName: lastName,
            userID: JSON.parse(userID)
          }))
          setInitialRoute("Welcome")
          //TODO update redux
        }
      }catch(err){

      }finally{
        setAppReady(true)
        await SplashScreen.hideAsync()
      }
    }
    init()
  }, [])

  if(!appReady){
    return null
  }
  return (
    <NavigationContainer>
      <AppNavigator initialRoute={initialRoute}/>
    </NavigationContainer>
  );
}


export default AppRoot