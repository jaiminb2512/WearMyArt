import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { useDispatch, useSelector } from "react-redux";
import ApiURLS from "../../Data/ApiURLS";
import { useFetchData } from "../../utils/apiRequest";
import { setCustomizaionOptionsData } from "../../Redux/customizaionOptionsSlice";

const Options = () => {
  const [color, setColor] = useState("#aabbcc");
  // const dispatch = useDispatch();

  // const customizationOptions = useSelector(
  //   (state) => state.updateCustomizaionOptions.CustomizaionOptions
  // );

  // const { data: fetchedCustomizationOptions = [], isLoading } = useFetchData(
  //   "CustomizationOptions",
  //   ApiURLS.GetCustomizationOptions.url,
  //   ApiURLS.GetCustomizationOptions.method
  // );

  // useEffect(() => {
  //   if (!customizationOptions || customizationOptions.length === 0) {
  //     if (fetchedCustomizationOptions.length > 0) {
  //       dispatch(setCustomizaionOptionsData(fetchedCustomizationOptions));
  //     }
  //   }
  // }, [customizationOptions, fetchedCustomizationOptions, dispatch]);

  return (
    <div>
      <div
        className="w-4 h-4 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
      <HexColorPicker color={color} onChange={setColor} />
    </div>
  );
};

export default Options;
