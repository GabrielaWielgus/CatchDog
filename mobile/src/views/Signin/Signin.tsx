import { Pressable, SafeAreaView, TextInput, View } from "react-native"
import { Text } from "react-native"
import { style } from "./style"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { counterSlice, increment } from "../../redux/features/counter"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { StatusBar } from "expo-status-bar"
import { Image } from "react-native"
import { useSignin } from "./useSignin"
import { Button } from "react-native"

const Signin = () => {
    const {formik, error} = useSignin()

    return(
        <KeyboardAwareScrollView style={style.signin}>
            <View style={style.imageWrapper}>
                <Image source={require("../../assets/img/background-login.png")} resizeMode="cover" style={style.image} />
            </View>
            
            <View style={style.formWrapper}>
                <TextInput 
                     placeholder="Email"
                     onChangeText={formik.handleChange('email')}
                     value={formik.values.email}
                     onBlur={formik.handleBlur('email')}
                />
                {
                    formik.touched.email && formik.errors.email ? (
                        <Text>{formik.errors.email}</Text>
                    ) : null
                }
                <TextInput
                    placeholder="Password"
                    onChangeText={formik.handleChange('password')}
                    value={formik.values.password}
                    onBlur={formik.handleBlur('password')}
                    secureTextEntry
                />
                {
                    formik.touched.password && formik.errors.password ? (
                        <Text>{formik.errors.password}</Text>
                    ) : null
                }
                {error ? <Text>{error}</Text> : null}
                <Button title="Login" onPress={() => {formik.handleSubmit()}} />
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Signin

