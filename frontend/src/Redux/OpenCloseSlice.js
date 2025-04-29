import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SideBarOpen: true,
  FilterBarOpen: false,
  TopBarOpen: false,
  SmScreen: false,
  HideText: false,
  productFormOpen: false,
};

const OpenCloseSlice = createSlice({
  name: "OpenClose",
  initialState,
  reducers: {
    ToggleBar: (state, action) => {
      return { ...state, ...action.payload };
    },
    toggleSidebar: (state) => {
      state.SideBarOpen = !state.SideBarOpen;
    },
    toggleFilterBar: (state) => {
      state.FilterBarOpen = !state.FilterBarOpen;
      if (!state.HideText) {
        state.HideText = !state.HideText;
      }
    },
    toggleHideText: (state) => {
      state.HideText = !state.HideText;
    },
    toggleSmScreen: (state, action) => {
      state.SmScreen = action.payload;
      state.SideBarOpen = !action.payload;
      state.FilterBarOpen = !action.payload;
      state.HideText = !action.payload;
    },
    toggleProductFormOpen: (state, action) => {
      state.productFormOpen = action.payload;
    },
  },
});

export const {
  ToggleBar,
  toggleSidebar,
  toggleFilterBar,
  toggleSmScreen,
  toggleHideText,
  toggleProductFormOpen,
} = OpenCloseSlice.actions;
export default OpenCloseSlice.reducer;
