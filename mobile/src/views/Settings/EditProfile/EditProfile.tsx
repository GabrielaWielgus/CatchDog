import { useAppSelector } from "../../../redux/hooks"
import { StatusBar } from "expo-status-bar"
import { TextInput, View } from "react-native"
import { Image } from "react-native"
import { Text } from "react-native"
import {style} from "./style"
import { TouchableOpacity } from "react-native"
import { useState } from "react"
import { useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"
import { userAPI } from "../../../API/userAPI"
import { AxiosError } from "axios"
import { Alert } from "react-native"

import { useAppDispatch } from "../../../redux/hooks"
import { userSlice } from "../../../redux/features/user"

const EditProfile = () => {
    const user = useAppSelector(state => state.user)
    const isFocused = useIsFocused()
    const dispatch = useAppDispatch()
    
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)

    useEffect(() => {
        if(isFocused){
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setEmail(user.email)
        }
    }, [isFocused])

    const handleSubmit = async () => {
        try{
            const data = await userAPI.data.patch({
                firstName, lastName, email
            })
            dispatch(userSlice.actions.set({
                firstName,
                lastName,
                email
            }))
            Alert.alert("Success", data.message, [
                {text: "OK", style: "cancel"}
            ])
        }catch(err){
            if(err instanceof AxiosError){
                console.log(err)
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
                <Text style={style.subTitle}>Edit First Name: </Text>
                <TextInput 
                    style={style.input} 
                    value={firstName}
                    placeholder="Enter New First Name"
                    onChangeText={(text) => {setFirstName(text)}}
                />
                <Text style={style.subTitle}>Edit Last Name: </Text>
                <TextInput 
                    style={style.input} 
                    value={lastName}
                    placeholder="Enter New Last Name"
                    onChangeText={(text) => {setLastName(text)}}
                />
                <Text style={style.subTitle}>Edit Email: </Text>
                <TextInput 
                    value={email}
                    style={style.input} 
                    placeholder="Enter New First Name"
                    onChangeText={(text) => {setEmail(text)}}
                />
                <TouchableOpacity style={style.styledButton} onPress={handleSubmit}>
                    <Text style={style.textButton}>Confirm changes</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditProfile