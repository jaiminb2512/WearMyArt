import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SideBarOpen: true,
  FilterBarOpen: true,
  TopBarOpen: false,
  SmScreen: false,
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
    toggleSmScreen: (state, action) => {
      state.SmScreen = action.payload;
    },
  },
});

export const { ToggleBar, toggleSidebar, toggleFilterBar, toggleSmScreen } =
  OpenCloseSlice.actions;
export default OpenCloseSlice.reducer;
