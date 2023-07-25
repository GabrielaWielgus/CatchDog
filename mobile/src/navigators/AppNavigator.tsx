import { createStackNavigator } from "@react-navigation/stack"
import Map from "../views/Map/Map"
import Signin from "../views/Signin/Signin"
import Signup from "../views/Signup/Signup"
import MapNavigator from "./MapNavigator"
import Welcome from "../views/Welcome/Welcome"
import { Colors } from "../config/Colors"

export type StackParamList = {
    MapNavigator: undefined;
    Signin: undefined;
    Signup: undefined;
    Welcome: undefined;
};

type props = {
    initialRoute: keyof StackParamList
}

export const AppNavigator = (props:props) => {
    const Stack = createStackNavigator<StackParamList>()

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
                headerLeft: undefined // null
            }}
        >
            <Stack.Screen 
                name='MapNavigator'
                component={MapNavigator}
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