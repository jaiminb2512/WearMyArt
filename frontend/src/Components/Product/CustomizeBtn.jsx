import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setProductData } from "../../Redux/tempProductSlice";
import { useNavigate } from "react-router-dom";

const CustomizeBtn = ({ product, variant }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (product) {
      dispatch(setProductData(product));
      navigate("/customize-product");
    }
  };
  return (
    <div>
      <Button
        variant={variant}
        onClick={() => handleClick()}
        className="w-full z-50"
      >
        Customize
      </Button>
    </div>
  );
};

export default CustomizeBtn;
