import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  selectedCity: "all",
  selectedType: "all",
  showFilters: false,
  page: 1,
};

const filterSlice = createSlice({
  name: "topRatedFilters",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => { state.searchQuery = action.payload; },
    setSelectedCity: (state, action) => { state.selectedCity = action.payload; state.page = 1; },
    setSelectedType: (state, action) => { state.selectedType = action.payload; state.page = 1; },
    setShowFilters: (state, action) => { state.showFilters = action.payload; },
    incrementPage: (state) => { state.page += 1; },
    resetFilters: () => initialState,
  },
});

export const {
  setSearchQuery,
  setSelectedCity,
  setSelectedType,
  setShowFilters,
  incrementPage,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;