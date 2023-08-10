import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./features/counter";
import {userSlice} from "./features/user"
import { walksSlice } from "./features/walks";
import {chatsSlice} from "./features/chats"
import { dogSlice } from "./features/dogs";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        user: userSlice.reducer,
        walks: walksSlice.reducer,
        chats: chatsSlice.reducer,
        dogs: dogSlice.reducer
    }
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch