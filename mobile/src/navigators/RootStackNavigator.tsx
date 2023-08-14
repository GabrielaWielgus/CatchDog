import { createStackNavigator } from "@react-navigation/stack"
import Map from "../views/Map/Map"
import Signin from "../views/Signin/Signin"
import Signup from "../views/Signup/Signup"
import { AppTabNavigator } from "./AppTabNavigator"
import Welcome from "../views/Welcome/Welcome"
import { Colors } from "../config/Colors"

export type RootStackParamList = {
    AppTabNavigator: undefined;
    Signin: undefined;
    Signup: undefined;
    Welcome: undefined;
};

type props = {
    initialRoute: keyof RootStackParamList
}

export const RootStackNavigator = (props:props) => {
    const Stack = createStackNavigator<RootStackParamList>()

    return(
        <Stack.Navigator
            initialRouteName={props.initialRoute}
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
                name='AppTabNavigator'
                component={AppTabNavigator}
            />
            <Stack.Screen 
                name="Signin"
                component={Signin}
            />
            <Stack.Screen 
                name="Signup"
                component={Signup}
            />
            <Stack.Screen 
                name="Welcome"
                component={Welcome}
            />
        </Stack.Navigator>
    )
}