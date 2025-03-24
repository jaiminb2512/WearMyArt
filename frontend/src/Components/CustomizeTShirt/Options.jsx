import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ApiURLS from "../../Data/ApiURLS";
import { useFetchData } from "../../utils/apiRequest";
import {
  setText,
  setFont,
  setTextStyle,
  setColor,
  setEditingCost,
  setSelectedSize,
} from "../../Redux/tempProductSlice";
import LocalSeeIcon from "@mui/icons-material/LocalSee";

const Options = () => {
  const dispatch = useDispatch();

  const tempProduct = useSelector((state) => state.tempProduct);
  const { CustomerImg, SelectedLayer, SelectedSize } = tempProduct;

  const productCustomization = useSelector((state) => state.tempProduct);
  const [color, setColorState] = useState(
    productCustomization.Color || "#aabbcc"
  );
  const [showPicker, setShowPicker] = useState(false);
  const selectedFont = productCustomization.Font;
  const selectedTextStyles = productCustomization.TextStyle || [];

  const pickerRef = useRef(null);
  const { data: fetchedCustomizationOptions = [] } = useFetchData(
    "CustomizationOptions",
    ApiURLS.GetCustomizationOptions.url,
    ApiURLS.GetCustomizationOptions.method
  );

  const fontOptions = fetchedCustomizationOptions?.FontOptions || {};
  const textStyles = fetchedCustomizationOptions?.TextStyles || {};

  const fontList = Object.entries(fontOptions).map(([font, price]) => ({
    label: `${font} - ₹${price}`,
    value: font,
  }));

  const textStyleList = Object.entries(textStyles).map(([style, price]) => ({
    label: `${style} - ₹${price}`,
    value: style,
    price: price,
  }));

  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFontChange = (event, newValue) => {
    dispatch(setFont(newValue?.value || ""));

    if (newValue) {
      let newCost =
        productCustomization.EditingCost -
        (fontOptions[productCustomization.Font] || 0) +
        fontOptions[newValue.value];
      dispatch(setEditingCost(newCost));
    }
  };

  const handleTextChange = (event) => {
    dispatch(setText(event.target.value));
  };

  const handleColorChange = (newColor) => {
    setColorState(newColor);
    dispatch(setColor(newColor));
  };

  const handleTextStyleChange = (style) => {
    dispatch(setTextStyle({ value: style.value, price: style.price }));
  };

  const sizeOptions = ["Original", "1:2", "9:16", "2:3", "2:4", "4:5", "1:1"];

  const handleSizeChange = (size) => {
    dispatch(setSelectedSize(size));
  };

  return (
    <div className="w-full">
      <p>EditingCost : {productCustomization.EditingCost}</p>

      {SelectedLayer === "Photo" && (
        <div className="p-4">
          <div className="flex justify-center items-center">
            {CustomerImg ? (
              <img
                src={CustomerImg}
                alt="Uploaded Preview"
                className="mt-4 max-h-[150px] w-auto object-contain rounded-lg shadow-md"
                loading="lazy"
              />
            ) : (
              <p className="h-[150px] flex justify-center items-center">
                <LocalSeeIcon className="h-full" />
              </p>
            )}
          </div>
          <h2 className="font-bold text-lg mb-2">Size</h2>
          <div className="flex gap-2 flex-wrap">
            {sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-3 py-1 rounded-lg border ${
                  SelectedSize === size
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black border-blue-500"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {SelectedLayer !== "Photo" && (
        <>
          <div className="p-4">
            <TextField
              label="Text"
              variant="standard"
              className="w-full"
              onChange={handleTextChange}
              value={productCustomization.Text || ""}
              style={{
                fontFamily: productCustomization.Font,
                fontWeight: selectedTextStyles.includes("Bold")
                  ? "bold"
                  : "normal",
                fontStyle: selectedTextStyles.includes("Italic")
                  ? "italic"
                  : "normal",
                textDecoration: selectedTextStyles.includes("Underline")
                  ? "underline"
                  : "none",
                color: productCustomization.Color,
              }}
            />
          </div>

          <div className="p-4 w-full">
            <Autocomplete
              disablePortal
              options={fontList}
              value={selectedFont}
              onChange={handleFontChange}
              sx={{ mb: 3 }}
              renderInput={(params) => <TextField {...params} label="Font" />}
            />

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h2>Select Text Styles</h2>
              </AccordionSummary>
              <AccordionDetails className="max-h-[200px] overflow-y-auto flex flex-col justify-start">
                {textStyleList.map((style) => (
                  <FormControlLabel
                    key={style.value}
                    control={
                      <Checkbox
                        checked={selectedTextStyles.includes(style.value)}
                        onChange={() => handleTextStyleChange(style)}
                      />
                    }
                    label={style.label}
                  />
                ))}
              </AccordionDetails>
            </Accordion>

            <div>
              <h2 className="text-lg font-bold mb-2">Pick a Color</h2>
              <div
                className="w-full h-10 rounded-full border cursor-pointer relative"
                style={{ backgroundColor: color }}
                onClick={() => setShowPicker(!showPicker)}
              ></div>
              {showPicker && (
                <div
                  ref={pickerRef}
                  className="absolute bg-white p-3 border rounded-lg shadow-lg z-50"
                  style={{ marginTop: "10px" }}
                >
                  <HexColorPicker color={color} onChange={handleColorChange} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Options;
