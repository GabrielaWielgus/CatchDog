import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"

interface User {
    firstName: string
    lastName: string
    email: string
    userID: number | null
}

const initialState: User = {
    firstName: "",
    lastName: "",
    email: "",
    userID: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Partial<User>>) => {
            return {...state, ...action.payload}
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload
        },
        setLastName: (state, action: PayloadAction<string>) => {
            state.lastName = action.payload
        },
        setUserID: (state, action: PayloadAction<number>) => {
            state.userID = action.payload
        },
    }
})

export const {set, setEmail, setFirstName, setLastName, setUserID} = userSlice.actions
export default userSlice.reducer