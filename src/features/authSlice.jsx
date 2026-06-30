import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    currentUser: localStorage.getItem("currentUser") || null,
    currentUserInfo: localStorage.getItem("currentUserInfo") || null,
    currentUserId: localStorage.getItem("currentUserId") || null,
    isAdmin: localStorage.getItem("isAdmin") === "true",
    loading: false,
    error: false,
    token: localStorage.getItem("token") || null
}

const handleAuthSuccess = (state, {payload}) => {
    state.loading = false
    state.error = false
    state.currentUser = payload?.user?.userName
    state.currentUserInfo = payload?.user
    state.currentUserId = payload?.user?._id
    state.isAdmin = payload?.user?.isAdmin
    state.token = payload?.token

    // Setting browser persistence layers on successful login authentication data stream
    localStorage.setItem("token", payload?.token || "")
    localStorage.setItem("currentUser", payload?.user?.userName || "")
    localStorage.setItem("currentUserInfo", payload?.user || {})
    localStorage.setItem("currentUserId", payload?.user?._id || "")
    localStorage.setItem("isAdmin", payload?.user?.isAdmin ? "true" : "false")
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
            state.currentUserInfo = null
            state.currentUserId = null
            state.isAdmin = false
            state.token = null
            // Completely wipe authentication markers from localStorage on session tear downs
            localStorage.removeItem("token")
            localStorage.removeItem("currentUser")
            localStorage.removeItem("currentUserId")
            localStorage.removeItem("isAdmin")
        },
        fetchFail: state => {
            state.loading = false
            state.error = true
        },
    }
})

export const {fetchStart, fetchFail, loginSuccess, registerSuccess, logoutSuccess} = authSlice.actions
export default authSlice.reducer