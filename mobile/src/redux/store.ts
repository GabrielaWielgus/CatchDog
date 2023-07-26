import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./features/counter";
import {userSlice} from "./features/user"
import { walksSlice } from "./features/walks";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        user: userSlice.reducer,
        walks: walksSlice.reducer
    }
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch