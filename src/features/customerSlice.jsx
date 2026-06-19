import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  customers: [],
  customersDetails: {
    totalRecords: 0,
    limit: 12,
    pages: {current: 1, total: 1}
  },
  customer: {
    _id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    citizenshipId: "",
    note: [],
    isActive: true,
  },
};

const customerSlice = createSlice({
  name: "customers",
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

export const { fetchStart, fetchFail, setData } = customerSlice.actions;
export default customerSlice.reducer;
