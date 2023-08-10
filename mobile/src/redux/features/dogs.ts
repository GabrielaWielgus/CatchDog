import { createSlice } from "@reduxjs/toolkit";
import { Dog } from "@backend/database/entities/Dog";
import { PayloadAction } from "@reduxjs/toolkit";
import { DogTreatment } from "@backend/database/entities/DogTreatment";

const initialState : Dog[] = []

export const dogSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {
    set: (state, action:PayloadAction<Dog[]>) => {
      return action.payload
    },
    setDogTreatment: (state, action:PayloadAction<{dogID: number, dogTreatment: DogTreatment}>) => {
      const dogToUpdate = state.find(d => d.id === action.payload.dogID);
      if (dogToUpdate) {
        dogToUpdate.treatments.push(action.payload.dogTreatment);
      }
    },
    removeDogTreatment: (state, action:PayloadAction<{dogID:number, treatmentID: number}>) => {
      const { dogID, treatmentID } = action.payload;
      const dogToUpdate = state.find(d => d.id === dogID);
      if (dogToUpdate) {
        const treatmentIndex = dogToUpdate.treatments.findIndex(t => t.id === treatmentID);
        if (treatmentIndex !== -1) {
          dogToUpdate.treatments = dogToUpdate.treatments.filter((t, index) => index !== treatmentIndex);
        }
      }
    }
  }
})

export const {set, setDogTreatment, removeDogTreatment} = dogSlice.actions
export default dogSlice.reducer