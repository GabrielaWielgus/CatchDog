import { StatusBar } from "expo-status-bar"
import { View } from "react-native"
import { Image } from "react-native"
import { Text } from "react-native"
import {style} from "./style"
import { TouchableOpacity } from "react-native"
import { TextInput } from "react-native"
import { useState } from "react"
import { Alert } from "react-native"
import {PatchPasswordRequest} from "@backend/controllers/user/patchPassword"
import { userAPI } from "../../../API/userAPI"
import { AxiosError } from "axios"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../../../config/Colors"
import { useSettingsStackNavigation } from "../../../navigators"

const EditPassword = () => {
    const settingsNavigation = useSettingsStackNavigation()

    const [credentials, setCredentials] = useState<PatchPasswordRequest>({
        password: "",
        newPassword: "",
        newPasswordRepeat: ""
    })

    const handleCredentialsChange = (key:keyof PatchPasswordRequest, value:string) => {
        const tmp = {...credentials}
        tmp[key] = value
        setCredentials(tmp)
    }

    const handleSubmit = async () => {
        try{
            const res = await userAPI.password.patch(credentials)
            setCredentials({password: "", newPassword: "", newPasswordRepeat: ""})
            Alert.alert("Success", "Password has been changed", [
                {text: "OK", style: "cancel"}
            ])
        }catch(err){
            if(err instanceof AxiosError){
                const header = err.response?.data.message ? err.response.data.message : "Error"
                const text = err.response?.data.errors ? err.response.data.errors[0].msg : ""
                Alert.alert(header, text, [
                    {text: "OK", style: "cancel"}
                ])
            }
        }
    }

    return (
        <View style={style.container}>
            <StatusBar style="light" />
            <View style={style.innerContainer}>
                <Image
                    style={style.image}
                    resizeMode="cover"
                    source={require('mobile/src/assets/img/background-welcome.png')}
                />
                <TouchableOpacity style={style.backButton} onPress={() => settingsNavigation.navigate("Settings")}> 
                <Ionicons name="arrow-back" size={24} color={Colors.beige} />
                </TouchableOpacity>
                <Text style={style.subTitle}>Provide current password: </Text>
                <TextInput 
                    style={style.input} 
                    value={credentials.password}
                    placeholder="**********"
                    secureTextEntry
                    onChangeText={(text) => handleCredentialsChange("password", text)}
                />
                <Text style={style.subTitle}>Provide new password: </Text>
                <TextInput 
                    style={style.input} 
                    value={credentials.newPassword}
                    placeholder="**********"
                    secureTextEntry
                    onChangeText={(text) => handleCredentialsChange("newPassword", text)}
                />
                <Text style={style.subTitle}>Confirm password: </Text>
                <TextInput 
                    style={style.input} 
                    value={credentials.newPasswordRepeat}
                    placeholder="**********"
                    secureTextEntry
                    onChangeText={(text) => {handleCredentialsChange("newPasswordRepeat", text)}}
                />
                <TouchableOpacity style={style.styledButton} onPress={handleSubmit}>
                    <Text style={style.textButton}>Apply changes</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditPassword