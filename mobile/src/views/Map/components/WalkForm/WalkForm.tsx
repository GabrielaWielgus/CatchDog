import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../../../config/Colors';
import { Foundation, AntDesign } from '@expo/vector-icons';
import { style } from "./style"
import MyPicker from '../../../../components/Picker/Picker';
import { Picker } from '@react-native-picker/picker';
import Input from '../../../../components/TextInput/Input';
import { useWalkForm } from './useWalkForm';

export interface FormValues {
  onLean: string;
  behavioralDisorders: string;
  walkDescription: string;
}

interface props {
  close: () => void
  startLocationTracking: () => Promise<void>
}

const WalkForm = (props:props) => {
  const {formik} = useWalkForm({
    startLocationTracking: props.startLocationTracking,
    closeForm: props.close
  })

  return (
    <KeyboardAwareScrollView>
      <View style={style.styledContainer}>
        <View style={style.innerContainer}>
          <Text style={style.pageTitle}>Information about your walk</Text>
          <TouchableOpacity
            style={style.buttonCloseForm}
            activeOpacity={1} 
            onPress={props.close}
          >
            <AntDesign
              name="close"
              size={25}
              color={Colors.beige}
            />
          </TouchableOpacity>
              <View style={style.styledFormArea}>
                <MyPicker
                  label="On Lean"
                  icon="guide-dog"
                  selectedValue={formik.values.onLean}
                  onValueChange={formik.handleChange("onLean")}
                >
                  <Picker.Item label="Yes" value="yes" color={Colors.beige} />
                  <Picker.Item label="No" value="no" color={Colors.beige} />
                </MyPicker>
                <MyPicker
                  label="Select dog behavioral disorder"
                  icon="heart"
                  selectedValue={formik.values.behavioralDisorders}
                  onValueChange={formik.handleChange("behavioralDisorders")}
                >
                  <Picker.Item label="None" value="none" color={Colors.beige} />
                  <Picker.Item label="Noise sensitivity" value="noiseSensitivity" color={Colors.beige} />
                  <Picker.Item label="Fear" value="fear" color={Colors.beige} />
                  <Picker.Item label="Aggression" value="aggression" color={Colors.beige} />
                </MyPicker>
                <Input
                  label=""
                  icon={<Foundation name="clipboard-pencil" size={30} color={Colors.text_primary} />}
                  placeholder="Walk description"
                  onChangeText={formik.handleChange('walkDescription')}
                  onBlur={formik.handleBlur("walkDescription")}
                  password={false}
                  value={formik.values.walkDescription}
                  error={formik.touched.walkDescription && formik.errors.walkDescription?.length!==0}
                  errorText={formik.errors.walkDescription}
                />
                <TouchableOpacity style={style.styledButton} onPress={() => formik.handleSubmit()}>
                    <Text style={style.buttonText}>Add</Text>
                </TouchableOpacity>
              </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default WalkForm;
