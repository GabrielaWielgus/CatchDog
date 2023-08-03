import { View } from "react-native"
import { Text, Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { style } from "./style"
import { StatusBar } from "expo-status-bar";
import { NavigationParams } from "../../navigators";
import { useAppSelector } from "../../redux/hooks";

import { useRootStackNavigation } from "../../navigators";
import { RootStackNavigationProp } from "../../navigators";


const Welcome = () => {
    const navigation = useRootStackNavigation() //useNavigation<NavigationParams>()
    const user = useAppSelector(state => state.user)

    return(
        <>
            <StatusBar style="light" />
            <View style={style.innerContainer}>
                <View style={style.welcomeContainer}>
                <Image style={style.welcomeImage} resizeMode="cover" source={require('../../assets/img/background-welcome.png')}></Image>
                <Text style={style.pageTitle}>Successfully logged in!</Text>
                <Text style={style.subTitle}>{user.email}</Text>{/* name */}
                <Text style={style.subTitle}>{}</Text>{/* mail */}
                    <View style={style.styledFormArea}> 
                        <Image style={style.avatar} resizeMode="cover" source={require('../../assets/img/profile-user.png')}></Image>
                        <TouchableOpacity style={style.styledButton} onPress={() => navigation.replace("AppTabNavigator")}>
                            <Text style={style.textButton}> Next </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

export default Welcome

