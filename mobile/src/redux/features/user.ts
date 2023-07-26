import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"

interface User {
    firstName: string
    lastName: string
    email: string
}

const initialState: User = {
    firstName: "",
    lastName: "",
    email: ""
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
    }
})

export const {set, setEmail, setFirstName, setLastName} = userSlice.actions
export default userSlice.reducer