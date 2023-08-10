import { SafeAreaView } from "react-native"
import { Text } from "react-native"

import { useHealthRecordStackRoute } from "../../../navigators"
import { useAppSelector } from "../../../redux/hooks"

import { TouchableOpacity } from "react-native"
import { useAppDispatch } from "../../../redux/hooks"
import { dogSlice } from "../../../redux/features/dogs"

import { dogAPI } from "../../../API/dogAPI"

const TreatmentList = () => {
  const route = useHealthRecordStackRoute()
  const dogs = useAppSelector(state => state .dogs)
  const dispatch = useAppDispatch()

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

  return (
    <SafeAreaView>
      {
        getTreatments()?.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => handleDelete(item.id)}>
              <Text>{item.date}</Text>
              <Text>{item.controlDate}</Text>
              <Text>{item.notes}</Text>
              <Text>{item.drugs}</Text>
            </TouchableOpacity>
          )
        })
      }
    </SafeAreaView>

  )
}

export default TreatmentList