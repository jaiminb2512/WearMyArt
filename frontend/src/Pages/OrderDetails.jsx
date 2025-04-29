import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import { Dialog, DialogContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleProductFormOpen } from "../Redux/OpenCloseSlice";

import SingleOrder from "../Components/OrderComponents/SingleOrder";
import SingleProduct from "../Components/ProductComponents/SingleProduct";
import SingleUser from "../Components/User/SingleUser";
import ProductForm from "../Components/ProductComponents/ProductForm";
import MTooltipButton from "../Components/MTooltipButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const order = location.state?.order;

  const [showData, setShowData] = useState(null);

  const { productFormOpen } = useSelector((state) => state.OpenClose);

  const {
    data: productData,
    refetch: refetchProducts,
    isLoading: isProductLoading,
  } = useFetchData(
    `productData-${order?.ProductId}`,
    `${ApiURLS.GetSingleProduct.url}/${order?.ProductId}`,
    ApiURLS.GetSingleProduct.method,
    {
      enabled: false,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState(productData);

  useEffect(() => {
    if (updatedProduct && Object.keys(updatedProduct).length > 0) {
      setSelectedProduct(updatedProduct);
    }
  }, [updatedProduct]);

  const handleOpenDialog = (product = null) => {
    setSelectedProduct(product);
    dispatch(toggleProductFormOpen(true));
  };

  const {
    data: userData,
    refetch: refetchUser,
    isLoading: isUserLoading,
  } = useFetchData(
    `userData-${order?.CustomerId}`,
    `${ApiURLS.GetSingleUser.url}/${order?.CustomerId}`,
    ApiURLS.GetSingleUser.method,
    {
      enabled: false,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  const handleFetchProduct = () => {
    setShowData("product");
    refetchProducts();
  };

  const handleFetchUser = () => {
    setShowData("user");
    refetchUser();
  };

  const handleCloseDialog = () => {
    dispatch(toggleProductFormOpen(false));
  };

  if (!order) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p>No order details available.</p>
      </div>
    );
  }

  const Product = updatedProduct ? updatedProduct : productData;

  return (
    <div className="ml-[2vw] overflow-hidden max-w-screen">
      <div className="left-0 w-full ml-[2vw] mt-[5vh] cursor-pointer">
        <MTooltipButton
          title="Go Back"
          color="success"
          onClick={() => navigate(-1)}
          variant="outlined"
          className="flex gap-2 justify-center items-center"
        >
          <ArrowBackIcon /> Go Back
        </MTooltipButton>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 w-full h-full mt-[2vh]">
        <div className="border rounded-2xl w-full max-w-[95%] mx-auto">
          <SingleOrder
            order={order}
            handleFetchProduct={handleFetchProduct}
            handleFetchUser={handleFetchUser}
          />
        </div>

        {showData === "product" && (
          <div className="rounded-2xl w-full max-w-[95%] mx-auto">
            {isProductLoading ? (
              <p className="text-center">Loading product data...</p>
            ) : (
              productData && (
                <SingleProduct
                  Product={Product}
                  handleOpenDialog={handleOpenDialog}
                />
              )
            )}
          </div>
        )}

        {showData === "user" && (
          <div className="border rounded-2xl w-full max-w-[95%] mx-auto">
            {isUserLoading ? (
              <p className="text-center">Loading user data...</p>
            ) : (
              userData && <SingleUser user={userData} />
            )}
          </div>
        )}
      </div>

      <Dialog
        open={productFormOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        aria-labelledby="product-form-dialog"
        PaperProps={{ style: { maxHeight: "95vh" } }}
      >
        <DialogContent>
          <ProductForm
            product={selectedProduct}
            onClose={handleCloseDialog}
            handleCloseDialog={handleCloseDialog}
            isEdit={!!selectedProduct}
            setUpdatedProduct={setUpdatedProduct}
            title={selectedProduct ? "Edit Product" : "Add New Product"}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderDetails;
