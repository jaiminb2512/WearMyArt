import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
  Autocomplete,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductData } from "../../Data/ProductData";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ApiURLS from "../../Data/ApiURLS";
import MTooltipButton from "../MTooltipButton";
import { useDispatch } from "react-redux";
import { showToast } from "../../Redux/ToastSlice";

const ProductForm = ({ product, title, handleCloseDialog, onSuccess }) => {
  const dispatch = useDispatch();

  const [fileObjects, setFileObjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Size: product?.Size || "",
    Price: product?.Price || "",
    DiscountedPrice: product?.DiscountedPrice || "",
    Sleeve: product?.Sleeve || "",
    Stock: product?.Stock || "",
    Color: product?.Color || "",
    CustomizeOption: product?.CustomizeOption || "",
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product?.ImgURL && product.ImgURL.length > 0) {
      console.log(product.ImgURL);
      setImagePreviews(product.ImgURL);
    }
  }, [product]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.Size) newErrors.Size = "Size is required";
    if (!formData.Color) newErrors.Color = "Color is required";
    if (!formData.Price) newErrors.Price = "Price is required";
    if (!formData.Sleeve) newErrors.Sleeve = "Sleeve type is required";
    if (!formData.Stock) newErrors.Stock = "Stock is required";
    if (!formData.CustomizeOption)
      newErrors.CustomizeOption = "Customization option is required";

    if (!product && fileObjects.length === 0) {
      newErrors.images = "At least one image is required";
    } else if (
      product &&
      imagePreviews.length === 0 &&
      fileObjects.length === 0
    ) {
      newErrors.images = "At least one image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleAutocompleteChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);

    const remainingSlots = 5 - imagePreviews.length;
    const newFiles = files.slice(0, remainingSlots);

    if (newFiles.length > 0) {
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

      setFileObjects((prev) => [...prev, ...newFiles]);
      setImagePreviews((prev) => [...prev, ...newPreviews]);
      setErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  const removeImage = (index) => {
    if (index < (product?.ImgURL?.length || 0)) {
      const newPreviews = [...imagePreviews];
      newPreviews.splice(index, 1);
      setImagePreviews(newPreviews);
    } else {
      const adjustedIndex = index - (product?.ImgURL?.length || 0);

      const newFiles = [...fileObjects];
      newFiles.splice(adjustedIndex, 1);
      setFileObjects(newFiles);

      const newPreviews = [...imagePreviews];
      newPreviews.splice(index, 1);
      setImagePreviews(newPreviews);
    }

    if (imagePreviews.length <= 1) {
      setErrors((prev) => ({
        ...prev,
        images: "At least one image is required",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);

        const productData = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
          productData.append(key, value);
        });

        if (product?._id) {
          productData.append("id", product._id);

          if (product.ImgURL) {
            const existingImages = imagePreviews.filter((url) =>
              product.ImgURL.includes(url)
            );

            if (existingImages.length > 0) {
              productData.append(
                "existingImages",
                JSON.stringify(existingImages)
              );
            }
          }
        }

        fileObjects.forEach((file) => {
          productData.append("ProductImages", file);
        });

        for (let pair of productData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        let response;
        if (product?._id) {
          const url = `${import.meta.env.VITE_BASE_URL}${
            ApiURLS.UpdateProduct.url
          }`;
          const method = ApiURLS.UpdateProduct.method;

          response = await axios({
            url,
            method,
            data: productData,
            withCredentials: true,
          });
        } else {
          const url = `${import.meta.env.VITE_BASE_URL}${
            ApiURLS.AddProduct.url
          }`;
          const method = ApiURLS.AddProduct.method;

          response = await axios({
            url,
            method,
            data: productData,
            withCredentials: true,
          });
        }

        if (response.data.success) {
          dispatch(
            showToast({
              message:
                response.data.message ||
                (product
                  ? "Product updated successfully"
                  : "Product added successfully"),
              variant: "success",
            })
          );

          handleCloseDialog();
          if (onSuccess) onSuccess();
        } else {
          throw new Error(response.data.message || "Operation failed");
        }
      } catch (error) {
        console.error("Error submitting product form:", error);

        const errorMessage =
          error?.response?.data?.message || "Something went wrong";
        dispatch(
          showToast({
            message: errorMessage,
            variant: "error",
          })
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-[85vh] relative">
      <Paper
        elevation={0}
        sx={{
          maxWidth: 900,
          width: "100%",
          boxShadow: "none",
          height: "100%",
        }}
      >
        <div className="absolute top-2 right-2">
          <HighlightOffIcon
            onClick={handleCloseDialog}
            sx={{ fontSize: 30, cursor: "pointer", color: "gray" }}
          />
        </div>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Grid item sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                component="label"
                startIcon={<AddAPhotoIcon />}
                sx={{ textTransform: "none" }}
                className="w-1/2"
                disabled={imagePreviews.length >= 5}
              >
                Upload up to 5 Images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
              {errors.images && (
                <Typography color="error" variant="body2">
                  {errors.images}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              {imagePreviews.map((preview, index) => (
                <Grid item key={index} xs={4} sx={{ position: "relative" }}>
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}${preview}`}
                    alt={`preview-${index}`}
                    style={{ width: 100, height: 100, borderRadius: "10px" }}
                  />
                  <IconButton
                    onClick={() => removeImage(index)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "white",
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  options={ProductData.Size}
                  value={formData.Size}
                  onChange={(event, value) =>
                    handleAutocompleteChange("Size", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Size"
                      error={!!errors.Size}
                      helperText={errors.Size}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Color"
                  name="Color"
                  value={formData.Color}
                  onChange={handleChange}
                  error={!!errors.Color}
                  helperText={errors.Color}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="Price"
                  type="number"
                  value={formData.Price}
                  onChange={handleChange}
                  error={!!errors.Price}
                  helperText={errors.Price}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Discounted Price"
                  name="DiscountedPrice"
                  type="number"
                  value={formData.DiscountedPrice}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  options={ProductData.Sleeve}
                  value={formData.Sleeve}
                  onChange={(event, value) =>
                    handleAutocompleteChange("Sleeve", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sleeve"
                      error={!!errors.Sleeve}
                      helperText={errors.Sleeve}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Stock"
                  name="Stock"
                  type="number"
                  value={formData.Stock}
                  onChange={handleChange}
                  error={!!errors.Stock}
                  helperText={errors.Stock}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  options={ProductData.CustomizeOption}
                  value={formData.CustomizeOption}
                  onChange={(event, value) =>
                    handleAutocompleteChange("CustomizeOption", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Customize Option"
                      error={!!errors.CustomizeOption}
                      helperText={errors.CustomizeOption}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div className="mt-4">
          <MTooltipButton
            title={product ? "Update Product" : "Add Product"}
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : product?._id
              ? "Update Product"
              : "Add Product"}
          </MTooltipButton>
        </div>
      </Paper>
    </div>
  );
};

export default ProductForm;
