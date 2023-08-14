import { Text, View } from "react-native"
import { TouchableOpacity } from "react-native"
import { useHealthRecordStackNavigation } from "../../../../../navigators"
import {style} from "./style"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../../../../../config/Colors"
import { dogAPI } from "../../../../../API/dogAPI"
import { dogSlice } from "../../../../../redux/features/dogs"
import { useAppDispatch } from "../../../../../redux/hooks"

interface props {
  dogID: number
  name :string
  breed: string
  sex: string
  age: number
}

const DogBadge = (props:props) => {
  const navigation = useHealthRecordStackNavigation()
  const dispatch = useAppDispatch()
  
  const handleDogDelete = async () => {
    try{
      await dogAPI.delete(props.dogID)
      dispatch(dogSlice.actions.removeDog(props.dogID))
    }catch(err){
      console.log(err)
    }
  }

  return(
      <TouchableOpacity onPress={() => navigation.navigate("DogDetails", {dogID: props.dogID})}>
        <View style={style.healthRecordContainer}>
          <Text style={style.dogName}>{props.name}</Text>
          <View style={style.divider} />
          <View style={style.wrapper}>
            <Text style={style.healthRecordText}>
              <Text>Breed: {props.breed}</Text> 
            </Text>
            <Text style={style.healthRecordText}>
              <Text>Sex: {props.sex}</Text> 
            </Text>
            <Text style={style.healthRecordText}>
              <Text>Age: {props.age}</Text> 
            </Text>
          </View>
          <TouchableOpacity onPress={handleDogDelete}>
            <Ionicons name="trash-outline" size={30} color={Colors.beige} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
  )
}


export default DogBadge