import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  properties: [],
  property: {
    _id: "",
    title: "",
    description: "",
    price: "",
    listingType: "",
    propertyCategory: "",
    city: "",
    district: "",
    neighbourhood: "",
    fullAddress: "",
    grossArea: null,
    netArea: null,
    floor: null,
    totalFloors: null,
    roomCount: null,
    bathroomCount: 0,
    buildingAge: 0,
    heatingType: "",
    maintenanceFee: null,
    isFurnished: null,
    occupancyStatus: "",
    hasElevator: null,
    hasParking: null,
    createdBy: "", // ??
    isActive: null,
    isFeatured: null,
    viewCount: 0,
    favouritesCount: 0,
    isLoanEligible: null,
    ownerId: ""
  },
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    setData: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state[payload.key] = payload.data;
    },
    setSingleData: (state, {payload}) => {
        state.loading = false
        state.error = null
        state[payload.key] = payload.data
    },
    // getPropertiesDataSuccess: (state) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.payload;
    // },
    fetchFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload || "An error occurred while fetching data.";
    },
  },
});

export const { fetchStart, fetchFail, setData, setSingleData } = propertySlice.actions;
export default propertySlice.reducer;
