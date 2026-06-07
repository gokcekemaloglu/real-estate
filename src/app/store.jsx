import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"

const store = configureStore({
    reducer: {
        auth: authReducer
    },
    devTools: import.meta.env.DEV
    // devTools: process.env.NODE_ENV !== "production"
})

export default store