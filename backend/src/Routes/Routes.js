import express from "express";
import userRoutes from "./userRoutes.js";
import productRoutes from "./productRoutes.js";
import orderRoutes from "./orderRoutes.js";
import customizationOptionsRoutes from "./customizationOptionsRoute.js";
import addressRoutes from "./userAddressRoutes.js";
import notificationRoute from "./notificationRoute.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/order", orderRoutes);
router.use("/customization-options", customizationOptionsRoutes);
router.use("/address", addressRoutes);
router.use("/notifications", notificationRoute);

export default router;
