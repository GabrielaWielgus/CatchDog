import { SafeAreaView, Text, View, Image, TouchableOpacity } from "react-native"
import { useAppSelector } from "../../redux/hooks";
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons";
import { style } from "./style"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from "../../config/Colors";
import * as SecureStore from "expo-secure-store"
import { useRootStackNavigation } from "../../navigators";
import { useSettingsStackNavigation } from "../../navigators";
import { chatSocket, mapSocket } from "../../socket";

const Settings = () => {
    const user = useAppSelector(state => state.user)
    const rootNavigation = useRootStackNavigation()
    const settingsNavigation = useSettingsStackNavigation()

    const handleLogout = async () => {
        chatSocket.disconnect()
        mapSocket.disconnect()
        await AsyncStorage.clear()
        SecureStore.deleteItemAsync("refreshToken")
        rootNavigation.navigate("Signin")
    }


    return (
        <View style={style.container}>
            <StatusBar style="light" />
            <View style={style.innerContainer}>
                <Image
                    style={style.image}
                    resizeMode="cover"
                    source={require('../../assets/img/background-welcome.png')}
                />
                <TouchableOpacity style={style.styledButton} onPress={()=>settingsNavigation.navigate("EditProfile")}>
                    <Text style={style.textButton}>Edit personal data</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.styledButton} onPress={()=>settingsNavigation.navigate("EditPassword")}>
                    <Text style={style.textButton}>Change password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.styledButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={30} color={Colors.text_primary}/>
                    <Text style={style.textButton}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Settings