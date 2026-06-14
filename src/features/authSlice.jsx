import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    currentUser: localStorage.getItem("currentUser") || null,
    currentUserId: localStorage.getItem("currentUserId") || null,
    loading: false,
    error: false,
    token: localStorage.getItem("token") || null
}

const handleAuthSuccess = (state, {payload}) => {
    state.loading = false
    state.error = false
    state.currentUser = payload?.user?.userName
    state.currentUserId = payload?.user?._id
    state.token = payload?.token

    // Setting browser persistence layers on successful login authentication data stream
    localStorage.setItem("token", payload?.token || "")
    localStorage.setItem("currentUser", payload?.user?.userName || "")
    localStorage.setItem("currentUserId", payload?.user?._id || "")
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
            // Completely wipe authentication markers from localStorage on session tear downs
            localStorage.removeItem("token")
            localStorage.removeItem("currentUser")
            localStorage.removeItem("currentUserId")
        },
        fetchFail: state => {
            state.loading = false
            state.error = true
        },
    }
})

export const {fetchStart, fetchFail, loginSuccess, registerSuccess, logoutSuccess} = authSlice.actions
export default authSlice.reducer