import { TouchableOpacity, View } from "react-native"
import { Text } from "react-native"
import { style } from "./style"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Image } from "react-native"
import { useSignin } from "./useSignin"
import { Octicons } from "@expo/vector-icons"
import Input from "../../components/TextInput/Input"
import { Colors } from "../../config/Colors"

const Signin = () => {
    const {formik, error} = useSignin()

    return(
        <KeyboardAwareScrollView style={style.signin}>
            <View style={style.imageWrapper}>
                <Image source={require("../../assets/img/background-login.png")} resizeMode="cover" style={style.image} />
            </View>
            
            <View style={style.formWrapper}>
                <Input 
                    placeholder="Email"
                    onChangeText={formik.handleChange('email')}
                    value={formik.values.email}
                    onBlur={formik.handleBlur("email")}
                    password={false}
                    label="Email"
                    icon={<Octicons name="mail" size={30} color={Colors.text_primary}/>}
                    error={formik.touched.email && formik.errors.email?.length!==0}
                    errorText={formik.errors.email}
                />
                <Input
                    placeholder="Password"
                    onChangeText={formik.handleChange('password')}
                    value={formik.values.password}
                    onBlur={formik.handleBlur("password")}
                    password={true}
                    label="Password"
                    icon={<Octicons name="lock" size={30} color={Colors.text_primary}/>}
                    error={formik.touched.password && formik.errors.password?.length!==0}
                    errorText={formik.errors.password}
                />
                
                {error ? <Text>{error}</Text> : null}
                <TouchableOpacity style={style.styledButton} onPress={() => {formik.handleSubmit()}}>
                    <Text style={style.textButton}>Login</Text>
                </TouchableOpacity>
                <View style={style.extraView}>
                    <Text style={style.extraText}>Don't have an account already?</Text>
                    {/* <Text style={style.textLink} onPress={() => navigation.navigate("Signup")}>
                        <Text style={style.textLinkContent}> Signup</Text>
                    </Text> */}
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Signin

