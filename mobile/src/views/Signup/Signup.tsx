import { TouchableOpacity, View } from "react-native"
import { Text } from "react-native"
import { style } from "./style"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Image } from "react-native"
import { useSignup } from "./useSignup"
import { Octicons } from "@expo/vector-icons"
import Input from "../../components/TextInput/Input"
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../config/Colors"
import { StackParamList } from "../../navigators/AppNavigator"
import { StackNavigationProp } from "@react-navigation/stack"
import { NavigationParams } from "../../navigators"

const Signup = () => {
    const {formik, error} = useSignup()
    const navigation = useNavigation<NavigationParams>()

    return(
        <KeyboardAwareScrollView style={style.signin}>
            <View style={style.imageWrapper}>
                <Image source={require("../../assets/img/background-login.png")} resizeMode="cover" style={style.image} />
            </View>
            
            <View style={style.formWrapper}>
                <Input 
                    placeholder="First name"
                    onChangeText={formik.handleChange('firstName')}
                    value={formik.values.firstName}
                    onBlur={formik.handleBlur("firstName")}
                    password={false}
                    label="First name"
                    icon={<Octicons name="person" size={30} color={Colors.text_primary}/>}
                    error={formik.touched.firstName && formik.errors.firstName?.length!==0}
                    errorText={formik.errors.firstName}
                />
                <Input 
                    placeholder="Last name"
                    onChangeText={formik.handleChange('lastName')}
                    value={formik.values.firstName}
                    onBlur={formik.handleBlur("lastName")}
                    password={false}
                    label="Last name"
                    icon={<Octicons name="person" size={30} color={Colors.text_primary}/>}
                    error={formik.touched.lastName && formik.errors.lastName?.length!==0}
                    errorText={formik.errors.lastName}
                />
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
                <Input
                    placeholder="Confirm Password"
                    onChangeText={formik.handleChange('passwordRepeat')}
                    value={formik.values.passwordRepeat}
                    onBlur={formik.handleBlur("passwordRepeat")}
                    password={true}
                    label="Confirm Password"
                    icon={<Octicons name="lock" size={30} color={Colors.text_primary}/>}
                    error={formik.touched.passwordRepeat && formik.errors.passwordRepeat?.length!==0}
                    errorText={formik.errors.passwordRepeat}
                />
                
                {error ? <Text>{error}</Text> : null}
                <TouchableOpacity style={style.styledButton} onPress={() => {formik.handleSubmit()}}>
                    <Text style={style.textButton}>Signup</Text>
                </TouchableOpacity>
                <View style={style.extraView}>
                    <Text style={style.extraText}>Have an account already?</Text>
                    <Text style={style.textLink} onPress={() => navigation.navigate("Signin")}>
                        <Text style={style.textLinkContent}> Login </Text>
                    </Text>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Signup

