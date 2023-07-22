import { View } from "react-native"
import { Text } from "react-native"
import { useAppSelector } from "../redux/hooks"


const Counter = () => {
    const data = useAppSelector(state => state.counter)
    return(
        <Text>Counter {data.value}</Text>
    )
}


export default Counter