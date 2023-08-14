import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { style } from './style';
import { Colors } from '../../../../../config/Colors';
import { Picker } from '@react-native-picker/picker';
import { treatmentAPI } from '../../../../../API/treatmentAPI';
import { Treatment } from "@backend/database/entities/Treatment";
import { useHealthRecordStackRoute } from '../../../../../navigators';
import { useTreatmentModal } from './useTreatmentModal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

interface TreatmentModalProps {
  close: () => void;
}

const TreatmentModal: React.FC<TreatmentModalProps> = ({ close }) => {
  const route = useHealthRecordStackRoute();
  const {
    selectedTreatment,
    setSelectedTreatment,
    date,
    setDate,
    drugs,
    setDrugs,
    nextControlDate,
    setNextControlDate,
    notes,
    setNotes,
    handlePostDogTreatment
  } = useTreatmentModal(route, close)

  useEffect(() => {
    fetchTreatments()
  }, [])

  const fetchTreatments = async () => {
    try {
      const data = await treatmentAPI.get()
      setTreatments(data.treatments)
    } catch (err) {
      console.log(err)
    }
  };

  const [treatments, setTreatments] = useState<Treatment[]>([]);

  return (
    <View style={style.styledContainer}>
      <View style={style.innerContainer}>
        <TouchableOpacity style={style.buttonCloseForm} onPress={close}>
          <AntDesign name="close" size={25} color={Colors.beige} />
        </TouchableOpacity>
        <Text style={style.pageTitle}>Add Health Record</Text>

        <View style={style.inputContainer}>
          <Picker
            selectedValue={selectedTreatment}
            onValueChange={v => setSelectedTreatment(v)}
            style={style.dropdown}
            itemStyle={style.pickerItem}
          >
            {treatments.map((t, index) => (
              <Picker.Item key={t.id} label={t.name} value={t.id} />
            ))}
          </Picker>
        </View>

        <View style={{ ...style.inputContainer, flexDirection: "row", alignItems: "center" }}>
          <Text style={style.label}>Date:</Text>
          <DateTimePicker
            value={date}
            mode='datetime'
            themeVariant='dark'
            onChange={(e, date) => setDate(date as Date)}
            style={{
              justifyContent: "flex-start",
            }}
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.label}>Drugs:</Text>
          <TextInput
            style={style.inputField}
            value={drugs}
            onChangeText={setDrugs}
            placeholder="Enter drugs"
          />
        </View>

        <View style={{ ...style.inputContainer, flexDirection: "row", alignItems: "center" }}>
          <Text style={style.label}>Control:</Text>
          <DateTimePicker
            value={nextControlDate}
            mode='datetime'
            themeVariant='dark'
            onChange={(e, date) => setNextControlDate(date as Date)}
            style={{
              justifyContent: "flex-start",
            }}
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.label}>Notes:</Text>
          <TextInput
            style={style.inputField}
            value={notes}
            onChangeText={setNotes}
            placeholder="Enter notes"
          />
        </View>

        <TouchableOpacity style={style.styledButton} onPress={handlePostDogTreatment}>
          <Foundation name="first-aid" size={30} color={Colors.beige} />
          <Text style={style.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TreatmentModal
