
import {dogAPI} from "../../API/dogAPI"
import {useEffect}from "react"
import { useIsFocused } from "@react-navigation/native"
import { useAppDispatch } from "../../redux/hooks"
import { dogSlice } from "../../redux/features/dogs"


export const useFetchDogs = () => {
  const dispatch = useAppDispatch()

  const fetchDogs = async () => {
    try{
      const data = await dogAPI.get()
      dispatch(dogSlice.actions.set(data.dogs))
    }catch(err){
      console.log(err)
    }
  }

  return {
    fetchDogs
  }
}