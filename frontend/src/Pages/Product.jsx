import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import ProductImages from "../Components/Product/ProductImages";
import { TbReplace } from "react-icons/tb";
import { Button, CircularProgress } from "@mui/material";
import CustomizeBtn from "../Components/Product/CustomizeBtn";

const Product = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [warning, setWarning] = useState("");

  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    error,
  } = useFetchData(
    ["product", id],
    `${ApiURLS.GetSingleProduct.url}/${id}`,
    ApiURLS.GetSingleProduct.method,
    {
      enabled: !!id,
    }
  );

  const increaseQuantity = () => {
    if (!product) return;

    if (quantity < product.Stock) {
      setQuantity(quantity + 1);
      setWarning("");
    } else {
      setWarning("Max Quantity is reached");
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setWarning("");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-xl text-red-500">
        Error loading product
      </div>
    );
  }

  if (!product) {
    return <div className="text-center mt-10 text-xl">No product found</div>;
  }

  const inStock = product.Stock > 0;

  const redirectToOrder = () => {
    navigate("/customizeProduct");
  };

  return (
    <div className="product-page-container mx-auto mt-12 p-4">
      <div className="flex flex-col sm:flex-row gap-10 justify-center">
        <ProductImages imgs={product.ImgURL} />
        <div className="product-data space-y-4">
          <div>
            {product.DiscountedPrice ? (
              <div>
                <p className="text-lg font-bold">
                  Price: <del className="text-red-500">{product.Price}</del>
                </p>
                <p className="text-xl font-semibold text-blue-600">
                  Deal of the Day: {product.DiscountedPrice}
                </p>
              </div>
            ) : (
              <p className="text-xl font-semibold text-blue-600">
                Price: {product.Price}
              </p>
            )}
          </div>
          <p className="text-md">Size: {product.Size}</p>
          <p className="text-md">Sleeve: {product.Sleeve}</p>
          <h1>Benefits:</h1>
          <div className="border-b border-gray-300 pb-4 flex gap-5">
            <div className="text-center">
              <TbReplace className="text-5xl mx-auto bg-gray-200 p-2 rounded-full" />
              <p>7 Days Replacement</p>
            </div>
          </div>
          <div className="text-lg space-y-2">
            <p>
              Available:{" "}
              <span className="font-semibold">
                {inStock ? "In Stock" : "Not Available"}
              </span>
            </p>
            <p>
              ID: <span className="font-semibold">{id}</span>
            </p>
          </div>
          <hr className="border-black w-5/6" />
          <div className="flex items-center space-x-4">
            <p className="text-lg">Quantity:</p>

            <div className="flex justify-center items-center gap-3">
              <Button
                onClick={decreaseQuantity}
                className="bg-gray-300 rounded-md"
                variant="outlined"
              >
                -
              </Button>
              <span className="text-lg">{quantity}</span>
              <Button
                onClick={increaseQuantity}
                variant="outlined"
                className="bg-gray-300 px-0 py-0 rounded-md"
              >
                +
              </Button>
            </div>
          </div>
          {warning && <p className="text-red-500">{warning}</p>}
          <div className="w-full">
            <CustomizeBtn variant={"contained"} product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
