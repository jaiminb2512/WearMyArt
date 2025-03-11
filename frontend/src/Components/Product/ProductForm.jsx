import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
  Input,
  Autocomplete,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductData } from "../../Data/ProductData";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ProductForm = ({ product, title, handleCloseDialog }) => {
  console.log(product);
  const [formData, setFormData] = useState({
    Size: product?.Size || "",
    Price: product?.Price || "",
    DiscountedPrice: product?.DiscountedPrice || "",
    Sleeve: product?.Sleeve || "",
    Stock: product?.Stock || "",
    Color: product?.Color || "",
    CustomizeOption: product?.CustomizeOption || "",
    images: product?.images || [],
    imagePreviews: [],
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.Size) newErrors.Size = "Size is required";
    if (!formData.Color) newErrors.Color = "Color is required";
    if (!formData.Price) newErrors.Price = "Price is required";
    if (!formData.Sleeve) newErrors.Sleeve = "Sleeve type is required";
    if (!formData.Stock) newErrors.Stock = "Stock is required";
    if (!formData.CustomizeOption)
      newErrors.CustomizeOption = "Customization option is required";
    if (formData.images.length === 0)
      newErrors.images = "At least one image is required";

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
    const newImages = [...formData.images, ...files].slice(0, 5);
    const newPreviews = newImages.map((file) => URL.createObjectURL(file));

    setFormData({
      ...formData,
      images: newImages,
      imagePreviews: newPreviews,
    });

    setErrors((prevErrors) => ({ ...prevErrors, images: "" }));
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    const newPreviews = [...formData.imagePreviews];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setFormData({
      ...formData,
      images: newImages,
      imagePreviews: newPreviews,
    });

    if (newImages.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        images: "At least one image is required",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);
      alert("success!");
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
            <label htmlFor="image-upload">
              <Input
                accept="image/*"
                id="image-upload"
                type="file"
                multiple
                onChange={handleImageChange}
                sx={{ display: "none" }}
              />
              <IconButton component="span">
                <AddAPhotoIcon sx={{ fontSize: 80, color: "gray" }} />
              </IconButton>
            </label>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Upload up to 5 Images
            </Typography>
            {errors.images && (
              <Typography color="error" variant="body2">
                {errors.images}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              {formData.imagePreviews.map((preview, index) => (
                <Grid item key={index} xs={4} sx={{ position: "relative" }}>
                  <img
                    src={preview}
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

        <Button
          type="submit"
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </Paper>
    </div>
  );
};

export default ProductForm;
