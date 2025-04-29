import { Router } from "express";
import {
  addOrder,
  addToCartOrder,
  cartToOrder,
  getAllCartOrder,
  getAllOrder,
  getSingleOrder,
  updateOrderStatus,
  updateCartQuantity,
  removeCart,
  orderData,
} from "../controllers/orderControllers.js";
import tokenVerification from "../middleware/tokenVerification.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.post(
  "/add-to-cart-order",
  tokenVerification,
  upload.fields([
    { name: "FinalProductImg", maxCount: 1 },
    { name: "CustomerImg", maxCount: 1 },
  ]),
  addToCartOrder
);
router.get("/get-cart-order", tokenVerification, getAllCartOrder);
router.post("/cart-to-order", tokenVerification, cartToOrder);
router.patch("/update-cart-quantity", tokenVerification, updateCartQuantity);
router.delete("/remove-cart", tokenVerification, removeCart);
router.post(
  "/add-order",
  tokenVerification,
  upload.fields([
    { name: "FinalProductImg", maxCount: 1 },
    { name: "CustomerImg", maxCount: 1 },
  ]),
  addOrder
);
router.patch(
  "/update-status/:id",
  (req, res, next) => tokenVerification(req, res, next, true),
  updateOrderStatus
);
router.get(
  "/single-order/:id",
  (req, res, next) => tokenVerification(req, res, next, true),
  getSingleOrder
);
router.post(
  "/get-all-orders",
  (req, res, next) => tokenVerification(req, res, next, true),
  getAllOrder
);
router.post(
  "/order-data",
  (req, res, next) => tokenVerification(req, res, next, true),
  orderData
);

export default router;
