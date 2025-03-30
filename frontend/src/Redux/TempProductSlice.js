import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CustomerImg: null,
  ProductImg: null,
  Quantity: 1,
  FinalProductImg: null,
  ProductId: null,
  Font: "Comic Sans MS",
  Text: "WearMyArt",
  Color: "#000000",
  Price: 0,
  TextStyle: [],
  SelectedLayer: "Text",
  CustomizeOption: "Both",
  SelectedSize: "Original",
  EditingCost: 0,
  TextEditingCost: 0,
  TextActive: false,
  ImgActive: false,
  size: 300,
  CustomizedType: "",
};

const tempProductSlice = createSlice({
  name: "tempProduct",
  initialState,
  reducers: {
    clearProductData: (state) => {
      state.CustomerImg = "";
      state.ProductImg = "";
      state.Quantity = 1;
      state.FinalProductImg = null;
      state.ProductId = null;
      state.Font = "";
      state.Text = "WearMyArt";
      state.Color = "#000000";
      state.Price = 0;
      state.TextStyle = [];
      state.SelectedLayer = "Text";
      state.CustomizeOption = "Both";
      state.SelectedSize = "Original";
      state.EditingCost = 0;
      state.TextEditingCost = 0;
      state.TextActive = false;
      state.ImgActive = false;
      state.size = 300;
      state.CustomizedType = "";
    },

    resetTempProduct: (state) => {
      state.CustomerImg = "";
      state.ProductImg = "";
      state.Quantity = 1;
      state.FinalProductImg = null;
      state.Font = "";
      state.Text = "WearMyArt";
      state.Color = "#000000";
      state.Price = 0;
      state.TextStyle = [];
      state.SelectedSize = "Original";
      state.EditingCost = 0;
      state.TextEditingCost = 0;
      state.TextActive = false;
      state.ImgActive = false;
      state.size = 300;
      state.CustomizedType = "";
    },

    setProductData: (state, action) => {
      return { ...state, ...action.payload };
    },

    setTextStyle: (state, action) => {
      const { value: selectedStyle, price: stylePrice } = action.payload;

      if (!state.TextStyle.includes(selectedStyle)) {
        state.TextStyle.push(selectedStyle);
        state.EditingCost += stylePrice;
        state.TextEditingCost += stylePrice;
      } else {
        state.TextStyle = state.TextStyle.filter(
          (style) => style !== selectedStyle
        );
        state.EditingCost -= stylePrice;
        state.TextEditingCost -= stylePrice;
      }
    },

    setFont: (state, action) => {
      state.Font = action.payload;
    },

    setText: (state, action) => {
      state.Text = action.payload;
      state.TextEditingCost += action.payload;
    },

    setSize: (state, action) => {
      state.size = action.payload;
    },

    setColor: (state, action) => {
      state.Color = action.payload;
    },

    setEditingCost: (state, action) => {
      state.EditingCost = action.payload;
      if (state.SelectedLayer == "Text") {
        state.TextEditingCost += action.payload;
      }
    },

    deletingText: (state) => {
      if (
        state.EditingCost > 0 &&
        state.TextEditingCost > 0 &&
        state.TextEditingCost <= state.EditingCost
      )
        state.EditingCost -= state.TextEditingCost;
      state.TextEditingCost = 0;
      state.Font = "Comic Sans MS";
      state.Text = "WearMyArt";
      state.Color = "#000000";
      state.TextActive = false;
      state.TextStyle = [];
      if (state.ImgActive == true) {
        state.CustomizedType = "Photo";
      } else {
        state.CustomizedType = "";
      }
    },

    setTextActive: (state) => {
      state.TextActive = true;
      if (state.ImgActive == true) {
        state.CustomizedType = "Both";
      } else {
        state.CustomizedType = "Text";
      }
    },

    setImgActive: (state, action) => {
      state.ImgActive = action.payload;
      if (action.payload == true) {
        state.EditingCost += 50;
        if (state.TextActive == true) {
          state.CustomizedType = "Both";
        } else {
          state.CustomizedType = "Photo";
        }
      } else {
        if (state.EditingCost > 0) {
          state.EditingCost -= 50;
          if (state.TextActive == true) {
            state.CustomizedType = "Text";
          } else {
            state.CustomizedType = "";
          }
        }
      }
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
  },
});

export const {
  clearProductData,
  setProductData,
  setTextStyle,
  setFont,
  setText,
  setColor,
  incQuantity,
  decQuantity,
  setFinalProductImg,
  setCustomerImg,
  setSelectedLayer,
  updateProductData,
  setSelectedSize,
  resetTempProduct,
  setEditingCost,
  deletingText,
  setImgActive,
  setTextActive,
  setSize,
} = tempProductSlice.actions;

export default tempProductSlice.reducer;
