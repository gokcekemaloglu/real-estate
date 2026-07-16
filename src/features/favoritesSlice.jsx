import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  myFavorites: [], 
  favoriteIds: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setFavoritesData: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.myFavorites = payload;
      // Maps a flat primitive string array vector of pure propertyIds for lightweight instant UI heart renders
      state.favoriteIds = payload?.map((fav) => fav.propertyId?._id || fav.propertyId) || [];
    },
    updateFavoriteIds: (state, { payload }) => {
      if (state.favoriteIds.includes(payload)) {
        state.favoriteIds = state.favoriteIds.filter((id) => id !== payload);
      } else {
        state.favoriteIds.push(payload);
      }
    },
    fetchFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload || "Favori işlemleri sırasında bir hata oluştu.";
    },
  },
});

export const { fetchStart, fetchFail, setFavoritesData, updateFavoriteIds } = favoritesSlice.actions;
export default favoritesSlice.reducer;
