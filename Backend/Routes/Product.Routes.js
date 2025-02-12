import { Router } from "express";
import VerifyJWT from "../middleware/VerifyJWT.js";
import AddProduct from "../Controllers/ProductControllers/AddProduct.Controller.js";
import UpdateProduct from "../Controllers/ProductControllers/UpdateProduct.Controller.js";
import DeleteProduct from "../Controllers/ProductControllers/DeleteProduct.Controller.js";
import GetAllProduct from "../Controllers/ProductControllers/GetAllProduct.Controller.js";

const router = Router();

router.post("/add-product", VerifyJWT, AddProduct);
router.post("/update-product", VerifyJWT, UpdateProduct);
router.delete("/delete/:id", VerifyJWT, DeleteProduct);
router.get("/get-all-products", VerifyJWT, GetAllProduct);

export default router;
