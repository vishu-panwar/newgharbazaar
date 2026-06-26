import { createSlice } from "@reduxjs/toolkit";

// ==========================================
// INITIAL STATE
// ==========================================
const initialState = {
  // stores full property objects
  bookmarks: [],
};

// ==========================================
// BOOKMARK SLICE
// ==========================================
const bookmarkSlice = createSlice({
  name: "bookmark",

  initialState,

  reducers: {
    // ==========================================
    // SET BOOKMARKS
    // ==========================================
    setItems: (state, action) => {
      state.bookmarks = action.payload || [];
    },

    // ==========================================
    // ADD BOOKMARK
    // ==========================================
    addBookmark: (state, action) => {
      const property = action.payload;

      // safety check
      if (!property || !property._id) return;

      // avoid duplicates
      const alreadyExists = state.bookmarks.some(
        (item) => item._id === property._id
      );

      if (!alreadyExists) {
        state.bookmarks.push(property);
      }
    },

    // ==========================================
    // REMOVE BOOKMARK
    // ==========================================
    removeBookmark: (state, action) => {
      const propertyId = action.payload;

      state.bookmarks = state.bookmarks.filter(
        (item) => item._id !== propertyId
      );
    },

    // ==========================================
    // TOGGLE BOOKMARK
    // ==========================================
    toggleBookmark: (state, action) => {
      const property = action.payload;

      if (!property || !property._id) return;

      const exists = state.bookmarks.some(
        (item) => item._id === property._id
      );

      if (exists) {
        state.bookmarks = state.bookmarks.filter(
          (item) => item._id !== property._id
        );
      } else {
        state.bookmarks.push(property);
      }
    },

    // ==========================================
    // CLEAR ALL BOOKMARKS
    // ==========================================
    clearBookmarks: (state) => {
      state.bookmarks = [];
    },
  },
});

// ==========================================
// EXPORT ACTIONS
// ==========================================
export const {
  setItems,
  addBookmark,
  removeBookmark,
  toggleBookmark,
  clearBookmarks,
} = bookmarkSlice.actions;

// ==========================================
// EXPORT REDUCER
// ==========================================
export default bookmarkSlice.reducer;