import { createStackNavigator } from "@react-navigation/stack"
import { Colors } from "../config/Colors"
import EditPassword from "../views/Settings/EditPassword/EditPassword"
import EditProfile from "../views/Settings/EditProfile/EditProfile"
import Settings from "../views/Settings/Settings"

export type SettingsStackParamList =  {
  Settings: undefined
  EditPassword: undefined
  EditProfile: undefined
}

export const SettingsStackNavigator = () => {
  const Stack = createStackNavigator<SettingsStackParamList>()

  return(
    <Stack.Navigator
            initialRouteName={"Settings"}
            screenOptions={{
                headerStyle: {
                  backgroundColor: 'transparent',
                },
                headerTintColor: Colors.beige,
                headerTransparent: true,
                headerTitle: '',
                headerLeftContainerStyle: {
                  paddingLeft: 20,
                },
                headerLeft: () => null 
            }}
        >
      <Stack.Screen
        name="Settings"
        component={Settings}
      />
      <Stack.Screen 
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen 
        name="EditPassword"
        component={EditPassword}
      />
    </Stack.Navigator>
  )
}
