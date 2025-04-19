import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import CustomizeBtn from "./CustomizeBtn";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BlockIcon from "@mui/icons-material/Block";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useSelector } from "react-redux";
import MTooltipButton from "../MTooltipButton";
import { useProductMutations } from "../../utils/useEntityMutations";

const ProductGridView = ({
  products: initialProducts,
  loading,
  handleOpenDialog = null,
  count,
}) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { FilterBarOpen } = useSelector((state) => state.OpenClose);
  const isAdmin = user?.isAdmin || false;
  const [products, setProducts] = useState(initialProducts);

  // Update local state when props change
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  // Callback to update local state after mutations
  const updateProductStatus = (productId, isDiscontinued) => {
    setProducts((currentProducts) =>
      currentProducts.map((p) =>
        p._id === productId ? { ...p, isDiscontinued } : p
      )
    );
  };

  const { handleDiscontinueProducts, handleReContinueProducts, isLoading } =
    useProductMutations(updateProductStatus);

  const redirectToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <h1 className="text-lg font-bold hidden sm:block">{`${count} Products`}</h1>
      <div className="flex-1 flex flex-col pb-10">
        {loading ? (
          <p>Loading products...</p>
        ) : products.length > 0 ? (
          <div
            className={`grid gap-6 grid-cols-1 sm:grid-cols-2 ${
              FilterBarOpen
                ? "md:grid-cols-2 lg:grid-cols-3"
                : "md:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {products.map((product) => (
              <div
                key={product._id}
                className="p-4 rounded-lg cursor-pointer shadow-xl hover:shadow-lg transition duration-300"
              >
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${product.ImgURL[0]}`}
                  alt={product.name}
                  loading="lazy"
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

                  {isAdmin ? (
                    <div className="flex gap-3">
                      <MTooltipButton
                        title="Edit Product"
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenDialog(product)}
                        disabled={isLoading}
                      >
                        <ModeEditIcon />
                      </MTooltipButton>

                      {product.isDiscontinued ? (
                        <MTooltipButton
                          title="Recontinue Product"
                          variant="contained"
                          color="secondary"
                          onClick={() => handleReContinueProducts(product)}
                          disabled={isLoading}
                        >
                          <ControlPointIcon />
                        </MTooltipButton>
                      ) : (
                        <MTooltipButton
                          title="Discontinue Product"
                          variant="contained"
                          color="error"
                          onClick={() => handleDiscontinueProducts(product)}
                          disabled={isLoading}
                        >
                          <BlockIcon />
                        </MTooltipButton>
                      )}
                    </div>
                  ) : (
                    <div className="w-full flex gap-3">
                      <CustomizeBtn variant={"contained"} product={product} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductGridView;
