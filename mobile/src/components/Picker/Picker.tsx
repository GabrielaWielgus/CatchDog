import React, { ReactNode } from 'react';
import { View , Text} from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { Colors } from '../../config/Colors';
import { style } from "./style"
import { Picker } from '@react-native-picker/picker';

interface MyPickerProps {
  label: string;
  icon: any;
  selectedValue: string | undefined;
  onValueChange: (itemValue: string) => void;
  children: ReactNode;
}

const MyPicker: React.FC<MyPickerProps> = ({ label, icon, selectedValue, onValueChange, children }) => {
  return (
    <View>
      <View style={style.leftIcon}>
        <Foundation name={icon} size={30} color={Colors.beige} />
      </View>
      <Text style={style.styledInputLabel}>{label}</Text>
      <View style={style.pickerView}>
        <Picker style={style.styledPicker}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
        >
          {children}
        </Picker>
      </View>
    </View>
  );
};

export default MyPicker;
