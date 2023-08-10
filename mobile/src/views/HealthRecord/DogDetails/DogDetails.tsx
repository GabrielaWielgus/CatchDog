import { SafeAreaView } from "react-native"
import { Text } from "react-native"
import { TouchableOpacity } from "react-native"

import { useHealthRecord } from "../useHealthRecord"
import { useAppSelector } from "../../../redux/hooks"
import { useHealthRecordStackRoute } from "../../../navigators"
import { useHealthRecordStackNavigation } from "../../../navigators"
import { Dog } from "@backend/database/entities/Dog"
import { DogTreatment } from "@backend/database/entities/DogTreatment"
import { Treatment } from "@backend/database/entities/Treatment"

const DogDetails = () => {
  const dogs = useAppSelector(state => state.dogs)
  const route = useHealthRecordStackRoute()
  const navigation = useHealthRecordStackNavigation()
  
  const getTypes = (dogs: Dog[]) : Treatment[] => {
    const dog = dogs.find(d => d.id === route.params?.dogID)
    if(!dog){
      return []
    }
    const types = []
    for(const t of dog?.treatments!){
      types.push(t.treatment)
    }
    return [...new Set(types)]
  }

  return (
    <SafeAreaView>
      <Text>Dog Details</Text>
      {
        getTypes(dogs).map((item, index) => {
          return(
            <TouchableOpacity key={index} onPress={() => navigation.navigate("TreatmentList", {dogID: route.params?.dogID as number, treatmentName: item.name}) }>
              <Text >{item.name}</Text>
            </TouchableOpacity>
          ) 
          
        })
      }
    </SafeAreaView>

  )
}

export default DogDetails