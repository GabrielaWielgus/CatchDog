import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Colors } from "../config/Colors"
import { Ionicons } from "@expo/vector-icons"
import Map from "../views/Map/Map"
import Walks from "../views/Walks/Walks"
import Chat from "../views/Chat/Chat"
import HealthRecord from "../views/HealthRecord/HealtRecord"
import Settings from "../views/Settings/Settings"

const MapNavigator = () => {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarStyle: {
                backgroundColor: Colors.background_tab_bar,
                borderRadius: 20,
                position: 'absolute',
                bottom: -10, 
                left: 10,
                right: 10,
                elevation: 5,
            },
            tabBarLabelStyle: { fontSize: 0, lineHeight: 0 }, 
            tabBarActiveTintColor: Colors.beige,
            tabBarInactiveTintColor: Colors.background,
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Map') {
                    return focused ? <Ionicons name={"map"} size={size} color={color} /> : <Ionicons name={"map-outline"} size={size} color={color} />;
                } else if (route.name === 'Walks') {
                    return focused ? <Ionicons name={"walk"} size={size} color={color} /> : <Ionicons name={"walk-outline"} size={size} color={color} />;
                } else if (route.name === 'Chat') {
                    return focused ? <Ionicons name={"chatbubble"} size={size} color={color} /> : <Ionicons name={"chatbubble-outline"} size={size} color={color} />;
                } else if (route.name === 'HealthRecord') {
                    return focused ? <Ionicons name={"book"} size={size} color={color} /> : <Ionicons name={"book-outline"} size={size} color={color} />;
                }
                else if (route.name === 'Settings') {
                    return focused ? <Ionicons name={"settings"} size={size} color={color} /> : <Ionicons name={"settings-outline"} size={size} color={color} />;
                }
            },
            headerShown: false,
            })}
      >
        <Tab.Screen
          name="Map"
          component={Map}
          options={{ 
            tabBarLabel: () => null 
            }}
        />
        <Tab.Screen
          name="Walks"
          component={Walks}
          options={{ tabBarLabel: () => null }}
        />
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{ tabBarLabel: () => null }}
        />
        <Tab.Screen
          name="HealthRecord"
          component={HealthRecord}
          options={{ tabBarLabel: () => null }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{ tabBarLabel: () => null }}
        />
      </Tab.Navigator>
    )
}

export default MapNavigator