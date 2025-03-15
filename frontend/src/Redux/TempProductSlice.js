import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CustomerImg: null,
  ProductImg: null,
  Quantity: 1,
  FinalCost: 0,
  FinalProductImg: null,
  ProductId: null,
  Font: null,
  Text: "WearMyArt",
  Color: "#000000",
  Price: 0,
  TextStyle: [],
  SelectedLayer: "Photo",
  CustomizeOption: "",
  SelectedSize: "Original",
};

const tempProductSlice = createSlice({
  name: "tempProduct",
  initialState,
  reducers: {
    clearProductData: () => initialState,

    setProductData: (state, action) => {
      return { ...state, ...action.payload };
    },

    setTextStyle: (state, action) => {
      const { value: selectedStyle, price: stylePrice } = action.payload;

      if (!state.TextStyle.includes(selectedStyle)) {
        // Add style if not already selected
        state.TextStyle.push(selectedStyle);
        state.FinalCost += stylePrice;
      } else {
        // Remove style if already selected
        state.TextStyle = state.TextStyle.filter(
          (style) => style !== selectedStyle
        );
        state.FinalCost -= stylePrice;
      }
    },

    setFont: (state, action) => {
      state.Font = action.payload;
    },

    setText: (state, action) => {
      state.Text = action.payload;
    },

    setColor: (state, action) => {
      state.Color = action.payload;
    },

    setFinalCost: (state, action) => {
      state.FinalCost = action.payload;
    },

    incQuantity: (state) => {
      state.Quantity += 1;
    },

    decQuantity: (state) => {
      if (state.Quantity > 1) {
        state.Quantity -= 1;
      }
    },

    setFinalProductImg: (state, action) => {
      state.FinalProductImg = action.payload;
    },

    setCustomerImg: (state, action) => {
      state.CustomerImg = action.payload;
    },

    updateProductData: (state, action) => {
      return { ...state, ...action.payload };
    },

    setSelectedLayer: (state, action) => {
      state.SelectedLayer = action.payload;
    },
    setSelectedSize: (state, action) => {
      state.SelectedSize = action.payload;
    },
    resetTempProduct: () => initialState,
  },
});

export const {
  clearProductData,
  setProductData,
  setTextStyle,
  setFont,
  setText,
  setColor,
  setFinalCost,
  incQuantity,
  decQuantity,
  setFinalProductImg,
  setCustomerImg,
  setSelectedLayer,
  updateProductData,
  setSelectedSize,
  resetTempProduct,
} = tempProductSlice.actions;

export default tempProductSlice.reducer;
