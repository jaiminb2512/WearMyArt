import CustomizationOptions from "../models/customizationOptionsModel.js";
import apiResponse from "../utils/apiResponse.js";

const addCustomizationOptions = async (req, res) => {
  const { FontOptions, TextStyles } = req.body;

  try {
    let customizationOptions = await CustomizationOptions.findOne({});

    if (!customizationOptions) {
      customizationOptions = new CustomizationOptions({
        FontOptions: new Map(Object.entries(FontOptions)),
        TextStyles: new Map(Object.entries(TextStyles)),
      });

      await customizationOptions.save();
      return apiResponse(
        res,
        true,
        customizationOptions,
        "Customization options created successfully",
        201
      );
    }

    if (FontOptions) {
      for (const [key, value] of Object.entries(FontOptions)) {
        customizationOptions.FontOptions.set(key, value);
      }
    }

    if (TextStyles) {
      for (const [key, value] of Object.entries(TextStyles)) {
        customizationOptions.TextStyles.set(key, value);
      }
    }

    await customizationOptions.save();

    return apiResponse(
      res,
      true,
      customizationOptions,
      "Customization options updated successfully",
      201
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const deleteCustomizationOptions = async (req, res) => {
  const { FontOptions, TextStyles } = req.body;

  try {
    let customizationOptions = await CustomizationOptions.findOne({});

    if (!customizationOptions) {
      return apiResponse(
        res,
        false,
        null,
        "Customization options not found",
        204
      );
    }

    if (FontOptions) {
      for (const font of FontOptions) {
        customizationOptions.FontOptions.delete(font);
      }
    }

    if (TextStyles) {
      for (const style of TextStyles) {
        customizationOptions.TextStyles.delete(style);
      }
    }

    await customizationOptions.save();

    return apiResponse(
      res,
      true,
      customizationOptions,
      "Customization options deleted successfully",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

const getCustomizationOptions = async (req, res) => {
  try {
    let customizationOptions = await CustomizationOptions.findOne({});

    return apiResponse(
      res,
      true,
      customizationOptions,
      "Customization options Fetched successfully",
      200
    );
  } catch (error) {
    return apiResponse(res, false, null, error.message, 500);
  }
};

export {
  addCustomizationOptions,
  deleteCustomizationOptions,
  getCustomizationOptions,
};
