import { createStackNavigator } from "@react-navigation/stack";
import { Colors } from "../config/Colors";
import DogList from "../views/HealthRecord/DogList/DogList";
import DogDetails from "../views/HealthRecord/DogDetails/DogDetails";
import TreatmentList from "../views/HealthRecord/TreatmentList/TreatmentList";

interface treatmentListRouteParams {
    treatmentName: string
    dogID: number
}

export type HealthRecordStackParamList = {
    DogList: undefined
    DogDetails: {dogID: number}
    TreatmentList: {
        treatmentName: string
        dogID: number
    }
};

export const HealthRecordStackNavigator = () => {
    const Stack = createStackNavigator<HealthRecordStackParamList>()

    return (
        <Stack.Navigator
            initialRouteName={"DogList"}
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
                name="DogList"
                component={DogList}
            />
            <Stack.Screen 
                name="DogDetails"
                component={DogDetails}
            />
            <Stack.Screen
                name="TreatmentList"
                component={TreatmentList}
            />
        </Stack.Navigator>
    )
}


