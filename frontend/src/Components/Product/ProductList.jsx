import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { Button } from "@mui/material";

const ProductList = ({ products, loading }) => {
  const navigate = useNavigate();

  const redirectToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const redirectToOrder = (product) => {
    navigate("/orderform", { state: { product } });
  };

  return (
    <div className="flex-1 flex flex-col">
      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="p-4 rounded-lg cursor-pointer shadow-xl hover:shadow-lg transition duration-300"
            >
              <img
                src={`${import.meta.env.VITE_BASE_URL}${product.ImgURL[0]}`}
                alt={product.name}
                className="w-full h-[350px] object-cover rounded-lg"
                onClick={() => redirectToProduct(product._id)}
              />
              <div className="flex flex-col gap-2">
                <div className="mt-2">
                  <p className="text-sm truncate">{`${product.Color} Customizable ${product.Sleeve}`}</p>
                  {product.DiscountedPrice ? (
                    <div className="flex items-center space-x-2">
                      <p className="font-bold flex items-center text-md">
                        <FaRupeeSign /> {product.DiscountedPrice}
                      </p>
                      <del className="text-gray-500">{product.Price}</del>
                    </div>
                  ) : (
                    <p className="flex font-bold items-center text-lg">
                      <FaRupeeSign />
                      {product.Price}
                    </p>
                  )}
                </div>
                <Button
                  variant="outlined"
                  onClick={() => redirectToOrder(product)}
                  className="w-full btn btn-primary z-50"
                >
                  Customize
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductList;
