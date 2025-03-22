import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    country: "India",
    streetAddress: "",
    apartment: "",
    city: "",
    postcode: "",
    phone: "",
    orderNotes: "",
    outOfStock: "Contact me (With delay)",
    heardAboutUs: "",
  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updateCheckoutForm: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetCheckoutForm: (state) => {
      state.formData = initialState.formData;
    },
  },
});

export const { updateCheckoutForm, resetCheckoutForm } = checkoutSlice.actions;
export default checkoutSlice.reducer;
