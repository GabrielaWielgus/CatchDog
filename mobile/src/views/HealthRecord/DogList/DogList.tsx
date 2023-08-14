import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useFetchDogs } from '../useFetchDogs'
import { useIsFocused } from '@react-navigation/native'
import { Colors } from '../../../config/Colors'
import { useAppSelector } from '../../../redux/hooks'
import { useHealthRecordStackNavigation } from '../../../navigators'
import DogModal from './components/DogModal/DogModal'
import DogBadge from './components/DogBadge/DogBadge'
import { style } from './style'
import { StatusBar } from 'expo-status-bar'

const DogList = () => {
  const { fetchDogs } = useFetchDogs()
  const isFocused = useIsFocused()
  const dogs = useAppSelector(state => state.dogs)
  const navigation = useHealthRecordStackNavigation()
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    if (isFocused === true) {
      fetchDogs();
    }
  }, [isFocused]);

  return (
    <>
    <StatusBar style="dark" />
    <Image
          style={style.healthRecordImage}
          resizeMode="cover"
          source={require('mobile/src/assets/img/background-healthRecord.png')}
    />
    <SafeAreaView style={style.safeArea}>
      <ScrollView contentContainerStyle={style.scrollViewContent}>
        <View style={style.healthRecordBlurredView}>
        </View>
        {dogs.map(dog => (
          <DogBadge
            key={dog.id}
            name={dog.name}
            dogID={dog.id}
            breed={dog.breed}
            sex={dog.sex}
            age={dog.age}
          />
        ))}
        <View style={style.bottomSpace} />
      </ScrollView>
      <TouchableOpacity style={style.Button} onPress={() => setFormVisible(true)}>
        <View style={[style.addButton]}>
          <Ionicons name="add" size={24} color={Colors.beige} />
        </View>
      </TouchableOpacity>
      {formVisible && (
        <DogModal
          close={() => setFormVisible(false)}
        />
      )}
    </SafeAreaView>
    </>
    
  )
}

export default DogList
