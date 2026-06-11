import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"

const store = configureStore({
    reducer: {
        auth: authReducer
    },
    // Enables Redux DevTools only during development environment for better security
    devTools: import.meta.env.DEV
})

export default store