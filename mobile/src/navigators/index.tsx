import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { StackNavigationProp } from '@react-navigation/stack';

import { StackParamList } from './AppNavigator';
import { TabsParamList } from './MapNavigator';

export type NavigationParams = CompositeNavigationProp<
    BottomTabNavigationProp<TabsParamList, "Map">,
    StackNavigationProp<StackParamList>
>