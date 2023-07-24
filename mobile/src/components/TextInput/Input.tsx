import { TextInput } from "react-native"
import { View, Text, TouchableOpacity } from "react-native"
import { style } from "./style"
import { ChangeEvent } from "react";

//icons
import {Ionicons} from '@expo/vector-icons';
import { Colors } from "../../config/Colors";
import { useState } from "react";

type props = {
    value:  string
    onBlur : (e: string | ChangeEvent<any>) => void
    onChangeText : (e: string | ChangeEvent<any>) => void
    placeholder: string
    icon: any
    password: boolean
    label: string
    error: boolean | undefined
    errorText: string | undefined
}

const Input = (props:props) => {
    const [hidePassword, setHidePassword] = useState(true);
    return(
        <View style={{width: "100%"}}>
            <View style={{width: "100%"}}>
                <View style={style.leftIconContainer}>
                    {props.icon}
                </View>
                <Text style={style.inputLabel}>{props.label}</Text>
                <TextInput
                    style={style.textInput}
                    placeholder={props.placeholder} 
                    secureTextEntry={props.password === true ? hidePassword : false}
                    value={props.value}
                    onChangeText={props.onChangeText}
                />
                {
                props.password && (
                    <TouchableOpacity style={style.rightIconContainer} onPress={() => setHidePassword(prev => !prev)}>
                        <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={Colors.text_primary}/>
                    </TouchableOpacity>
                    )
                }
            </View>
            {
                <Text>
                    {props.error && props.errorText ? props.errorText : ""}
                </Text>
            }
        </View>
    )
}

export default Input