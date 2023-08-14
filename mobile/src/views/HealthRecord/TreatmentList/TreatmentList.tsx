import { SafeAreaView } from "react-native"
import { Text, View } from "react-native"

import { useHealthRecordStackNavigation } from "../../../navigators";
import { useHealthRecordStackRoute } from "../../../navigators"
import { useAppSelector } from "../../../redux/hooks"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"
import { useAppDispatch } from "../../../redux/hooks"
import { dogSlice } from "../../../redux/features/dogs"
import { Colors } from "../../../config/Colors"
import { dogAPI } from "../../../API/dogAPI"
import {style} from "./style"
import { ScrollView } from "react-native"


const TreatmentList = () => {
  const route = useHealthRecordStackRoute()
  const dogs = useAppSelector(state => state .dogs)
  const dispatch = useAppDispatch()
  const navigation = useHealthRecordStackNavigation()


  const getTreatments = () => {
    const dog = dogs.find(d => d.id === route.params?.dogID)
    if(!dog) {
      return []
    }
    const params = route.params as {dogID: number, treatmentName:string}
    const treatments = dog.treatments.filter(t => t.treatment.name === params.treatmentName)

    return treatments
  }

  const handleDelete = async (treatmentID:number) => {
    try{
      await dogAPI.treatment.delete(route.params?.dogID as number, treatmentID)
      dispatch(dogSlice.actions.removeDogTreatment({
        dogID: route.params?.dogID as number,
        treatmentID: treatmentID
      }))
    }
    catch(err){
      console.log(err)
    }
  }
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().substr(0, 10);
    return formattedDate;
  }

  return (
    <SafeAreaView style={style.healthRecordViewStyle}>
      <ScrollView>
      {getTreatments()?.map((item, index) => {
        return (
          <View key={index} style={style.subListContainer}>
            <View style={style.subListItemTitleContainer}>
              <View>
                <Text style={style.subListItemTitle}>{item.treatment.name}</Text>
                <Text style={style.subListDateText}>Date: {formatDate(item.date)}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <View style={style.rightIcon}>
                  <Ionicons name="trash" size={30} color={Colors.beige} />
                </View>
              </TouchableOpacity>
            </View>
  
            <View style={style.subListItemContainer}>
              <View>
                <View style={style.subListItemTextContainer}>
                  <Text style={style.subListItemTextBold}>Next Control Date: </Text>
                  <Text style={style.subListItemText}>{formatDate(item.controlDate)}</Text>
                </View>
                <View style={style.subListItemTextContainer}>
                  <Text style={style.subListItemTextBold}>Drugs:</Text>
                  <Text style={style.subListItemText}>{item.drugs}</Text>
                  <Text style={style.subListItemTextBold}>Notes:</Text>
                  <Text style={style.subListItemText}>{item.notes}</Text>
                </View>
              </View>
          </View>
        </View>
      )
    })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default TreatmentList