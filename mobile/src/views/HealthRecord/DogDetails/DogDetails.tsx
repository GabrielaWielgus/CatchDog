import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View, Image } from "react-native"
import { useAppSelector } from "../../../redux/hooks"
import { useHealthRecordStackRoute } from "../../../navigators"
import { useHealthRecordStackNavigation } from "../../../navigators"
import { Dog } from "@backend/database/entities/Dog"
import {style} from "./style"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../../../config/Colors"
import { useState } from "react"
import TreatmentModal from "./components/TreatmentModal/TreatmentModal"

const DogDetails = () => {
  const dogs = useAppSelector((state) => state.dogs)
  const route = useHealthRecordStackRoute()
  const navigation = useHealthRecordStackNavigation()
  const [formVisible, setFormVisible] = useState(false)

  const getTypes = (dogs: Dog[]): string[] => {
    const dog = dogs.find((d) => d.id === route.params?.dogID)
    if (!dog) {
      return []
    }
    const types = dog.treatments!.map((t) => t.treatment.name)
    return [...new Set(types)]
  }

  return (
    <View style={style.container}>
      <View style={{display: "flex"}}>
        <Image
          style={style.healthRecordImage}
          resizeMode="cover"
          source={require('mobile/src/assets/img/background-healthRecord.png')}
        />
        <TouchableOpacity style={style.backButton} onPress={() => navigation.navigate("DogList")}> 
          <Ionicons name="arrow-back" size={24} color={Colors.background_tab_bar} />
        </TouchableOpacity>
        <View style={style.healthRecordBlurredView}>
          <Text style={style.healthRecordTitlePage}>Health Record</Text>
        </View>
      </View>
      <View style={style.treatmentList}>
        {getTypes(dogs).map((name, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("TreatmentList", {
                  dogID: route.params?.dogID as number,
                  treatmentName: name,
                })
              }
              style={style.treatmentItem}
            >
              <Text style={style.treatmentText}>{name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity style={style.Button} onPress={() => setFormVisible(true)}>
            <View style={[style.addButton]}>
                <Ionicons name="add" size={24} color={Colors.beige} />
            </View>
            </TouchableOpacity>

        {formVisible && (
            <TreatmentModal
            close={() => setFormVisible(false)}/>
      )}
    </View>
  )
}

export default DogDetails
