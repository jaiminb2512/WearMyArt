import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApiMutation, useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import ProductImages from "../Components/ProductComponents/ProductImages";
import { Button, CircularProgress, Dialog, DialogContent } from "@mui/material";
import CustomizeBtn from "../Components/ProductComponents/CustomizeBtn";
import { useSelector } from "react-redux";
import MTooltipButton from "../Components/MTooltipButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BlockIcon from "@mui/icons-material/Block";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ProductForm from "../Components/ProductComponents/ProductForm";

const Product = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [warning, setWarning] = useState("");
  const { user } = useSelector((state) => state.user);
  const { isAdmin } = user;

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

  const discontinueProductsMutation = useApiMutation(
    ApiURLS.DiscontinueProducts.url,
    ApiURLS.DiscontinueProducts.method
  );

  const reContinueProducts = useApiMutation(
    ApiURLS.RecontinueProducts.url,
    ApiURLS.RecontinueProducts.method
  );

  const handleDiscontinueProducts = async (id) => {
    console.log("ReContinue product:", id);
    await discontinueProductsMutation.mutateAsync({ Products: [id] });
  };
  const handleReContinueProducts = async (id) => {
    console.log("Discontinue product:", id);
    await reContinueProducts.mutateAsync({ Products: [id] });
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
          )}
          {warning && <p className="text-red-500">{warning}</p>}
          {isAdmin ? (
            <div className="flex gap-3">
              <MTooltipButton
                title="Edit Product"
                variant="contained"
                color="primary"
                onClick={() => handleOpenDialog(product)}
              >
                <ModeEditIcon />
              </MTooltipButton>

              {product.isDiscontinued ? (
                <MTooltipButton
                  title="Recontinue Product"
                  variant="contained"
                  color="secondary"
                  onClick={() => handleReContinueProducts(product._id)}
                >
                  <ControlPointIcon />
                </MTooltipButton>
              ) : (
                <MTooltipButton
                  title="Discontinue Product"
                  variant="contained"
                  color="error"
                  onClick={() => handleDiscontinueProducts(product._id)}
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

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
            aria-labelledby="product-form-dialog"
            PaperProps={{
              style: {
                maxHeight: "95vh",
              },
            }}
          >
            <DialogContent>
              <ProductForm
                product={selectedProduct}
                onClose={handleCloseDialog}
                handleCloseDialog={handleCloseDialog}
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
