import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApiMutation, useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import ProductImages from "../Components/ProductComponents/ProductImages";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import CustomizeBtn from "../Components/ProductComponents/CustomizeBtn";
import { useSelector } from "react-redux";
import MTooltipButton from "../Components/MTooltipButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BlockIcon from "@mui/icons-material/Block";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ProductForm from "../Components/ProductComponents/ProductForm";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

const Product = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [warning, setWarning] = useState("");
  const { user } = useSelector((state) => state.user);
  const { isAdmin } = user || false;

  const navigate = useNavigate();
  const {
    data: product,
    isLoading: productLoading,
    error,
  } = useFetchData(
    ["product", id],
    `${ApiURLS.GetSingleProduct.url}/${id}`,
    ApiURLS.GetSingleProduct.method,
    {
      enabled: !!id,
    }
  );

  const [Product, setProduct] = useState(null);

  useEffect(() => {
    if (product) {
      setProduct(product);
    }
  }, [product]);

  const discontinueProductsMutation = useApiMutation(
    ApiURLS.DiscontinueProducts.url,
    ApiURLS.DiscontinueProducts.method
  );

  const reContinueProductsMutation = useApiMutation(
    ApiURLS.RecontinueProducts.url,
    ApiURLS.RecontinueProducts.method
  );

  const handleDiscontinueProducts = async (id) => {
    await discontinueProductsMutation.mutateAsync({ Products: [id] });
    setProduct((prevProduct) =>
      prevProduct ? { ...prevProduct, isDiscontinued: true } : prevProduct
    );
  };

  const handleReContinueProducts = async (id) => {
    await reContinueProductsMutation.mutateAsync({ Products: [id] });
    setProduct((prevProduct) =>
      prevProduct ? { ...prevProduct, isDiscontinued: false } : prevProduct
    );
  };

  const getAllCustomersOfProductsMutation = useApiMutation(
    ApiURLS.GetAllCustomersOfProducts.url,
    ApiURLS.GetAllCustomersOfProducts.method
  );

  const handleGetCustomers = async (id) => {
    await getAllCustomersOfProductsMutation.mutateAsync({ ProductId: id });
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenDialog = (product = null) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

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

  if (productLoading) {
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

  if (!Product) {
    return <div className="text-center mt-10 text-xl">No product found</div>;
  }

  const inStock = Product.Stock > 0;

  const redirectToOrder = () => {
    navigate("/customizeProduct");
  };

  return (
    <div className="product-page-container mx-auto mt-12 p-4 h-full">
      <div className="flex flex-col sm:flex-row gap-10 justify-center h-full">
        <ProductImages imgs={Product.ImgURL} />
        <div className="product-data space-y-4">
          <div>
            {Product.DiscountedPrice ? (
              <div>
                <p className="text-lg font-bold">
                  Price: <del className="text-red-500">{Product.Price}</del>
                </p>
                <p className="text-xl font-semibold text-blue-600">
                  Deal of the Day: {Product.DiscountedPrice}
                </p>
              </div>
            ) : (
              <p className="text-xl font-semibold text-blue-600">
                Price: {Product.Price}
              </p>
            )}
          </div>
          <p className="text-md">Size: {Product.Size}</p>
          <p className="text-md">Sleeve: {Product.Sleeve}</p>
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
          {!isAdmin && (
            <div className="flex items-center space-x-4">
              <p className="text-lg">Quantity:</p>

              <div className="flex items-center border rounded-lg">
                <IconButton
                  size="small"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <KeyboardArrowDown />
                </IconButton>
                <span className="px-4 text-lg font-semibold">{quantity}</span>
                <IconButton size="small" onClick={increaseQuantity}>
                  <KeyboardArrowUp />
                </IconButton>
              </div>
            </div>
          )}
          {warning && <p className="text-red-500">{warning}</p>}
          {isAdmin ? (
            <div className="flex gap-3">
              <MTooltipButton
                title="Edit Product"
                variant="contained"
                color="primary"
                onClick={() => handleOpenDialog(Product)}
              >
                <ModeEditIcon />
              </MTooltipButton>

              {Product.isDiscontinued ? (
                <MTooltipButton
                  title="Recontinue Product"
                  variant="contained"
                  color="secondary"
                  onClick={() => handleReContinueProducts(Product._id)}
                >
                  <ControlPointIcon />
                </MTooltipButton>
              ) : (
                <MTooltipButton
                  title="Discontinue Product"
                  variant="contained"
                  color="error"
                  onClick={() => handleDiscontinueProducts(Product._id)}
                >
                  <BlockIcon />
                </MTooltipButton>
              )}

              <MTooltipButton
                title="Customer"
                variant="contained"
                color="success"
                onClick={() => handleGetCustomers()}
              >
                <SupervisorAccountIcon />
              </MTooltipButton>
            </div>
          ) : (
            <div className="w-full flex gap-3">
              <CustomizeBtn variant={"contained"} product={Product} />
            </div>
          )}

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
          >
            <DialogContent>
              <ProductForm
                product={selectedProduct}
                onClose={handleCloseDialog}
                isEdit={!!selectedProduct}
                title={selectedProduct ? "Edit Product" : "Add New Product"}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Product;
