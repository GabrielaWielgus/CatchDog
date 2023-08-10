import { SafeAreaView } from "react-native"
import { Text } from "react-native"
import { useFetchDogs } from "../useFetchDogs"
import { useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"
import { View, TouchableOpacity } from "react-native"

import { FlatList } from "react-native"

import { Dog } from "@backend/database/entities/Dog"
import {style} from "./style"

import { useAppSelector } from "../../../redux/hooks"
import { useHealthRecordStackNavigation } from "../../../navigators"

const DogList = () => {
  const {fetchDogs} = useFetchDogs()
  const isFocused = useIsFocused()
  const dogs = useAppSelector(state => state.dogs)
  const navigation = useHealthRecordStackNavigation()

  useEffect(() => {
    if(isFocused === true){
      fetchDogs()
    }
  }, [isFocused])

  useEffect(() => {
    console.log(Object.values(dogs))
  }, [dogs])

  const renderItem = ({item}: {item:Dog}) => {
    return ( 
      <TouchableOpacity onPress={() => navigation.navigate("DogDetails", {dogID: item.id})}>
      <View style={style.healthRecordContainer}>
        <Text style={style.healthRecordTitle}>{item.name}</Text>
        <View style={style.divider} />
        <View>
          <Text style={style.healthRecordText}>
            <Text>Breed: {item.breed}</Text> 
          </Text>
          <Text style={style.healthRecordText}>
            <Text>Sex: {item.sex}</Text> 
          </Text>
          <Text style={style.healthRecordText}>
            <Text>Age: {item.age}</Text> 
          </Text>
        </View>
      </View>
      </TouchableOpacity>
    )
}

  return (
    <SafeAreaView>
      <FlatList
        data={dogs}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ marginTop: 10, paddingBottom: 20 }}
      />
    </SafeAreaView>
  )
}

export default DogList