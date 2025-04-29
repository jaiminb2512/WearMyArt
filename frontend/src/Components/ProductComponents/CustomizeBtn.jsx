import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setProductData } from "../../Redux/tempProductSlice";
import { useNavigate } from "react-router-dom";

const CustomizeBtn = ({ product, variant }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const DataToSet = {
    ProductImg: product.ImgURL[0],
    Price: product?.DiscountedPrice || product.Price,
    ProductId: product._id,
    CustomizeOption: product.CustomizeOption,
  };

  const handleClick = () => {
    if (product) {
      dispatch(setProductData(DataToSet));
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
