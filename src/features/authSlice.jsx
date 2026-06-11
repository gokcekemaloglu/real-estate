import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    currentUser: null,
    currentUserId: null,
    loading: false,
    error: false,
    token: null
}

const handleAuthSuccess = (state, {payload}) => {
    state.loading = false
    state.error = false
    state.currentUser = payload?.user?.userName
    state.currentUserId = payload?.user?._id
    state.token = payload?.token
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        fetchStart: state => {
            state.loading = true
            state.error = false
        },
        registerSuccess: handleAuthSuccess,
        loginSuccess: handleAuthSuccess,
        logoutSuccess: state => {
            state.loading = false
            state.error = false
            state.currentUser = null
            state.currentUserId = null
            state.token = null
        },
        fetchFail: state => {
            state.loading = false
            state.error = true
        },
    }
})

export const {fetchStart, fetchFail, loginSuccess, registerSuccess, logoutSuccess} = authSlice.actions
export default authSlice.reducer