import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SideBarOpen: false,
  FilterBarOpen: true, // Initially visible
  TopBarOpen: false,
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
    },
  },
});

export const { ToggleBar, toggleSidebar, toggleFilterBar } =
  OpenCloseSlice.actions;
export default OpenCloseSlice.reducer;
