import { useNavigate } from "react-router"
import { useAppSelector } from "../redux/store"
import { useEffect } from "react"



type props = {
    path: string
    component: React.FunctionComponent
}

const ProtectedRoute = (props:props)  => {
    const navigate = useNavigate()
    const {signedIn} = useAppSelector(state => state.auth)

    useEffect(() => {
        if(signedIn === false) navigate("/auth/signin")
    }, [signedIn, navigate])

    return signedIn ? <props.component /> : null
}


export default ProtectedRoute