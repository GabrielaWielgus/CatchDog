import { View } from "react-native"
import { Text, Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { style } from "./style"
import { StatusBar } from "expo-status-bar";
import { StackParamList } from "../../navigators/AppNavigator"
import { StackNavigationProp } from "@react-navigation/stack"
import { NavigationParams } from "../../navigators";

const Welcome = () => {
    const navigation = useNavigation<NavigationParams>()

    return(
        <>
            <StatusBar style="light" />
            <View style={style.innerContainer}>
                <View style={style.welcomeContainer}>
                <Image style={style.welcomeImage} resizeMode="cover" source={require('../../assets/img/background-welcome.png')}></Image>
                <Text style={style.pageTitle}>Successfully logged in!</Text>
                <Text style={style.subTitle}>{}</Text>{/* name */}
                <Text style={style.subTitle}>{}</Text>{/* mail */}
                    <View style={style.styledFormArea}> 
                        <Image style={style.avatar} resizeMode="cover" source={require('../../assets/img/profile-user.png')}></Image>
                        <TouchableOpacity style={style.styledButton} onPress={() => navigation.navigate("MapNavigator")}>
                            <Text style={style.buttonText}> Next </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

export default Welcome

