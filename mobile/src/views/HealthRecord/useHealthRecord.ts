
import {dogAPI} from "../../API/dogAPI"
import {useEffect}from "react"
import { useIsFocused } from "@react-navigation/native"

export const useHealthRecord = () => {
  const isFocused = useIsFocused()

  useEffect(() => {
    if(isFocused === true){
      fetchDogs()
    }
  }, [isFocused])

  const fetchDogs = async () => {
    try{
      const data = await dogAPI.get()
      console.log(data)
    }catch(err){
      console.log(err)
    }
  }

  return {
    
  }
}