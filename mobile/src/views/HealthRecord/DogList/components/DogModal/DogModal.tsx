import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { style } from './style';
import { Colors } from '../../../../../config/Colors';
import { Foundation } from '@expo/vector-icons';
import { dogAPI } from '../../../../../API/dogAPI';
import { useAppDispatch } from '../../../../../redux/hooks';
import { dogSlice } from '../../../../../redux/features/dogs';

interface DogModalProps {
  close: () => void;
}

const DogModal: React.FC<DogModalProps> = ({ close }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState<number|null>(null);

  const dispatch = useAppDispatch()

  const handleDogPost = async () => {
    try{
      const data = await dogAPI.post({name, breed, sex, age: age || 0})
      dispatch(dogSlice.actions.addDog(data.dog))
      close()
    }catch(err){
      console.log(err)
    }
  }

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
            onChangeText={setName}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>Breed</Text>
          <TextInput
            style={style.inputField}
            placeholder="Enter breed"
            value={breed}
            onChangeText={setBreed}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>Sex</Text>
          <TextInput
            style={style.inputField}
            placeholder="Enter sex"
            value={sex}
            onChangeText={setSex}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>Age</Text>
          <TextInput
            style={style.inputField}
            placeholder="Enter age"
            value={age}
            onChangeText={setAge}
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
