import { Alert } from "react-native"
import { useAppDispatch } from "../../../redux/hooks"
import { dogAPI } from "../../../API/dogAPI"
import { dogSlice } from "../../../redux/features/dogs"
import { useHealthRecordStackRoute } from "../../../navigators"
import { useAppSelector } from "../../../redux/hooks"

interface Treatment {
  id: number
  treatment: {
    name: string
  };
  date: string
  controlDate: string
  drugs: string
  notes: string
}

export const useTreatmentList = () => {
  const route = useHealthRecordStackRoute()
  const dogs = useAppSelector((state) => state.dogs)
  const dispatch = useAppDispatch()

  const getTreatments = () => {
    const dog = dogs.find((d) => d.id === route.params?.dogID)
    if (!dog) {
      return []
    }
    const params = route.params as { dogID: number; treatmentName: string }
    const treatments = dog.treatments.filter(
      (t) => t.treatment.name === params.treatmentName
    )

    return treatments
  }

  const handleDelete = async (treatmentID: number) => {
    try {
      Alert.alert(
        "Delete Treatment",
        "Are you sure you want to delete this treatment?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              try {
                await dogAPI.treatment.delete(
                  route.params?.dogID as number,
                  treatmentID
                );

                dispatch(
                  dogSlice.actions.removeDogTreatment({
                    dogID: route.params?.dogID as number,
                    treatmentID: treatmentID,
                  })
                );
              } catch (err) {
                console.log(err)
              }
            },
          },
        ]
      )
    } catch (err) {
      console.log(err)
    }
  }

  return {
    getTreatments,
    handleDelete,
  }
}
