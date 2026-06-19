import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  users: [],
  userDetails: {
    totalRecords: 0,
    limit: 12,
    pages: {current: 1, total: 1}
  },
  user: {
    _id: "",
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    isActive: true,
    isAdmin: false,
    // isEmailVerified: false,
  },
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setData: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state[payload.endpoint] = payload.data;
    },

    fetchFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload || "Veriler çekilirken bir hata oluştu.";
    },
  },
});

export const { fetchStart, fetchFail, setData } = userSlice.actions;
export default userSlice.reducer;
