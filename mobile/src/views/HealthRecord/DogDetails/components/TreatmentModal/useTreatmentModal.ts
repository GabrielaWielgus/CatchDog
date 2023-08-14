import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { dogAPI } from '../../../../../API/dogAPI';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAppDispatch } from '../../../../../redux/hooks';
import { dogSlice } from '../../../../../redux/features/dogs';

export function useTreatmentModal(route: any, close: any) {
  const dispatch = useAppDispatch()

  const [selectedTreatment, setSelectedTreatment] = useState(1)
  const [date, setDate] = useState(new Date())
  const [drugs, setDrugs] = useState('')
  const [nextControlDate, setNextControlDate] = useState(new Date())
  const [notes, setNotes] = useState('')

  const handlePostDogTreatment = async () => {
    if (drugs.trim() === '' || notes.trim() === '') {
      Alert.alert("Fields cannot be empty")
      return
    }

    try {
      const data = await dogAPI.treatment.post({
        notes: notes,
        date: date.toISOString(),
        controlDate: nextControlDate.toISOString(),
        drugs: drugs,
        dogID: route.params?.dogID as number,
        treatmentID: selectedTreatment
      })
      dispatch(dogSlice.actions.setDogTreatment({
        dogID: route.params?.dogID as number,
        dogTreatment: data.dogTreatment
      }))
      close()
    } catch (err) {
      console.log(err)
    }
  }

  return {
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
  }
}
