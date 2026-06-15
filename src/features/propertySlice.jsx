import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  properties: [],
  property: {
    _id: "",
    title: "",
    description: "",
    price: 0,
    listingType: "",
    propertyCategory: "",
    city: "",
    district: "",
    neighbourhood: "",
    fullAddress: "",
    grossArea: 0,
    netArea: 0,
    floor: 0,
    totalFloors: null,
    roomCount: "",
    bathroomCount: 0,
    buildingAge: 0,
    heatingType: "none",
    maintenanceFee: 0,
    isFurnished: false,
    occupancyStatus: "",
    hasElevator: false,
    hasParking: false,
    createdBy: "", // ??
    isActive: true,
    isFeatured: false,
    viewCount: 0,
    favouritesCount: 0,
    isLoanEligible: true,
    ownerId: "",
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
    setData: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state[payload.key] = payload.data;
    },
    // setSingleData: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = null;
    //   state[payload.key] = payload.data;
    // },
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

export const { fetchStart, fetchFail, setData, 
    // setSingleData 
} = propertySlice.actions;
export default propertySlice.reducer;
