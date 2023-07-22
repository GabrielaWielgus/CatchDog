import { SafeAreaView, View } from "react-native"
import { Text } from "react-native"
import { style } from "./style"

const Signin = () => {


    return(
        <SafeAreaView style={style.signin}>
            <Text style={style.header}>
                Header
            </Text>
            <Text>Input</Text>
            <View>
                <Text>text in wrapper</Text>
            </View>
        </SafeAreaView>
    )
}

export default Signin

