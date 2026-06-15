import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import propertyReducer from "../features/propertySlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        property: propertyReducer
    },
    // Enables Redux DevTools only during development environment for better security
    devTools: import.meta.env.DEV
})

export default store