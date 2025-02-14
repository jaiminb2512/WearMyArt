import { Router } from "express";
import VerifyJWT from "../middleware/VerifyJWT.js";
import AddOrder from "../Controllers/OrderControllers/Addorder.Controller.js";
import { upload } from "../middleware/multer.middleware.js";
import GetAllOrder from "../Controllers/OrderControllers/GetAllOrder.Controller.js";
import VerifyAdmin from "../middleware/VerifyAdmin.js";
import UpdateOrderState from "../Controllers/OrderControllers/UpdateOrderState.Controller.js";
import GetSingleOrder from "../Controllers/OrderControllers/GetSingleOrder.Controller.js";

const route = Router();

route.post(
  "/add-order",
  VerifyJWT,
  upload.fields([
    { name: "CustomerImg", maxCount: 1 },
    { name: "FinalProductImg", maxCount: 1 },
  ]),
  AddOrder
);

route.post("/update-state/:id", VerifyAdmin, UpdateOrderState);
route.get("/single-order/:id", VerifyAdmin, GetSingleOrder);
route.get("/get-all-orders", VerifyJWT, GetAllOrder);

export default route;
