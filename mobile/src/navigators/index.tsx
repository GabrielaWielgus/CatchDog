import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from './RootStackNavigator';
import { ChatStackParamList } from './ChatStackNavigator';
import {HealthRecordStackParamList} from "./HealthRecordStackNavigator"
import { SettingsStackParamList } from './SettingsStackNavigator';

import { AppTabParamList } from './AppTabNavigator';
import { useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export type NavigationParams = CompositeNavigationProp<
    StackNavigationProp<RootStackParamList>,
    CompositeNavigationProp<
        StackNavigationProp<ChatStackParamList>,
        BottomTabNavigationProp<AppTabParamList, "Map">
    >
>

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>
export type AppTabNavigationProp = BottomTabNavigationProp<AppTabParamList>
export type ChatStackNavigationProp = StackNavigationProp<ChatStackParamList>
export type HealthRecordStackNavigationProp = StackNavigationProp<HealthRecordStackParamList>
export type SettingsStackNavigationProp = StackNavigationProp<SettingsStackParamList>

// Typed useNavigation
export const useRootStackNavigation : () => RootStackNavigationProp = useNavigation
export const useAppTabNavigation : () => AppTabNavigationProp = useNavigation
export const useChatStackNavigation : () => ChatStackNavigationProp = useNavigation
export const useHealthRecordStackNavigation : () => HealthRecordStackNavigationProp = useNavigation
export const useSettingsStackNavigation : () => SettingsStackNavigationProp = useNavigation

// Typed useRoute
export const useChatStackRoute : () => RouteProp<ChatStackParamList> = useRoute
export const useHealthRecordStackRoute : () => RouteProp<HealthRecordStackParamList> = useRoute