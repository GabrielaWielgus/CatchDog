import { SafeAreaView } from "react-native"
import { Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"
import { ScrollView } from "react-native"
import { Colors } from "../../../config/Colors"
import { style } from "./style"
import { useHealthRecordStackNavigation } from "../../../navigators"
import { useHealthRecordStackRoute } from "../../../navigators"
import { useTreatmentList } from "./useTreatementList"

const TreatmentList = () => {
  const route = useHealthRecordStackRoute()
  const navigation = useHealthRecordStackNavigation()
  const { getTreatments, handleDelete } = useTreatmentList()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().substr(0, 10)
    return formattedDate
  };

  return (
    <SafeAreaView style={style.healthRecordViewStyle}>
      <TouchableOpacity
        style={style.backButton}
        onPress={() =>
          navigation.navigate("DogDetails", {
            dogID: route.params?.dogID as number,
          })
        }
      >
        <Ionicons name="arrow-back" size={24} color={Colors.background_tab_bar} />
      </TouchableOpacity>
      <ScrollView style={{ marginTop: "10%" }}>
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
                    <Text style={style.subListItemText}>
                      {formatDate(item.controlDate)}
                    </Text>
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
          );
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default TreatmentList
