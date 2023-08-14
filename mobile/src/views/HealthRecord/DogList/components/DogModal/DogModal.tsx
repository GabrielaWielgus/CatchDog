import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { style } from './style';
import { Colors } from '../../../../../config/Colors';
import { Foundation } from '@expo/vector-icons';
import { dogAPI } from '../../../../../API/dogAPI';
import { useAppDispatch } from '../../../../../redux/hooks';
import { dogSlice } from '../../../../../redux/features/dogs';
import { Picker } from '@react-native-picker/picker';

interface DogModalProps {
  close: () => void;
}

const DogModal: React.FC<DogModalProps> = ({ close }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState('male');
  const [age, setAge] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  const handleDogPost = async () => {
    if (!name || !breed || !age || isNaN(age) || age > 25) {
      let errorMessage = 'Please fill in all fields correctly.';
      if (age && age > 25) {
        errorMessage = 'Age must be 25 or less.';
      }
      Alert.alert('Validation Error', errorMessage);
      return;
    }

    try {
      const data = await dogAPI.post({ name, breed, sex, age });
      dispatch(dogSlice.actions.addDog(data.dog));
      close();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={style.styledContainer}>
      <View style={style.innerContainer}>
        <TouchableOpacity style={style.buttonCloseForm} onPress={close}>
          <AntDesign name="close" size={25} color={Colors.beige} />
        </TouchableOpacity>
        <Text style={style.pageTitle}>Add new dog</Text>
        <View style={style.inputContainer}>
          <Text style={style.label}>Name</Text>
          <TextInput
            style={style.inputField}
            placeholder="Enter name"
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>Breed</Text>
          <TextInput
            style={style.inputField}
            placeholder="Enter breed"
            value={breed}
            onChangeText={(text) => {
              setBreed(text);
            }}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>Sex</Text>
          <Picker
            selectedValue={sex}
            onValueChange={(itemValue) => setSex(itemValue)}
            style={style.dropdown}
            itemStyle={style.pickerItem}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>Age</Text>
          <TextInput
            style={style.inputField}
            placeholder="Enter age"
            keyboardType="numeric"
            value={age ? age.toString() : ''}
            onChangeText={(text) => {
              const parsedAge = parseInt(text);
              setAge(isNaN(parsedAge) ? null : parsedAge);
            }}
          />
        </View>
        <TouchableOpacity style={style.styledButton} onPress={handleDogPost}>
          <Foundation name="guide-dog" size={40} color={Colors.beige} />
          <Text style={style.buttonText}>Add dog</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DogModal;
