import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import propertyReducer from "../features/propertySlice"
import customerReducer from "../features/customerSlice"
import userReducer from "../features/userSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        property: propertyReducer,
        customers: customerReducer,
        users: userReducer
    },
    // Enables Redux DevTools only during development environment for better security
    devTools: import.meta.env.DEV
})

export default store