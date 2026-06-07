import {createSlice} from "@reduxjs/toolkit"

// Initial state reads token and user info from localStorage if available
const initialState = {
    currentUser: null,
    currentUserId: null,
    loading: false,
    error: false,
    token: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        fetchStart: state => {
            state.loading = true
            state.error = false
        },
        fetchFail: state => {
            state.loading = false
            state.error = true
        },
        // registerSuccess: (state, {payload}) => {
        //     state.loading = false
        //     state.error = false
        //     state.currentUser = payload?.user?.userName
        //     state.currentUserId = payload?.user?._id
        //     state.token = payload?.token
        // }
    }
})

export const {fetchStart, fetchFail} = authSlice.actions
export default authSlice.reducer