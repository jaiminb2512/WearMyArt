import express from "express";
import UserRoutes from "./userRoutes.js";
import ProductRoutes from "./productRoutes.js";
import OrderRoutes from "./orderRoutes.js";
import CustomizationOptionsRoutes from "./customizationOptionsRoute.js";

const router = express.Router();

router.use("/user", UserRoutes);
router.use("/product", ProductRoutes);
router.use("/order", OrderRoutes);
router.use("/customization-options", CustomizationOptionsRoutes);

export default router;
