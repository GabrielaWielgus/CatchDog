import { SafeAreaView } from "react-native"
import { Text, Image } from "react-native"
import { useFetchDogs } from "../useFetchDogs"
import { useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"
import { View, TouchableOpacity } from "react-native"
import { StatusBar } from 'expo-status-bar';
import { FlatList } from "react-native"
import { ScrollView } from "react-native"
import { Colors } from "../../../config/Colors"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import DogModal from "./components/DogModal/DogModal"
import { Dog } from "@backend/database/entities/Dog"
import {style} from "./style"
import DogBadge from "./components/DogBadge/DogBadge"

import { useAppSelector } from "../../../redux/hooks"
import { useHealthRecordStackNavigation } from "../../../navigators"

const DogList = () => {
  const {fetchDogs} = useFetchDogs()
  const isFocused = useIsFocused()
  const dogs = useAppSelector(state => state.dogs)
  const navigation = useHealthRecordStackNavigation()
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    if(isFocused === true){
      fetchDogs()
    }
  }, [isFocused])


  return (
    <>
    <ScrollView >
      <StatusBar style="dark" />
      <Image
        style={style.healthRecordImage}
        resizeMode="cover"
        source={require('mobile/src/assets/img/background-healthRecord.png')}
      />
      <View style={style.healthRecordBlurredView}>
        <Text style={style.healthRecordTitlePage}>Dog Health Record</Text>
      </View>
      {
        dogs.map((dog, index) => {
          return (
          <DogBadge 
            key={dog.id}
            name={dog.name}
            dogID={dog.id}
            breed={dog.breed}
            sex={dog.sex}
            age={dog.age}
          />
          ) 
        })
      }
    </ScrollView>
    <TouchableOpacity style={style.Button} onPress={() => setFormVisible(true)}>
      <View style={[style.addButton]}>
          <Ionicons name="add" size={24} color={Colors.beige} />
      </View>
    </TouchableOpacity>
    {
      formVisible && (
        <DogModal
          close={() => setFormVisible(false)}
        />
      )
    }
    </>
  )
}

export default DogList