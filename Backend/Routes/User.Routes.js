import { Router } from "express";
import RegisterUser from "../Controllers/UserControllers/RegisterUser.Controller.js";
import UpdateUser from "../Controllers/UserControllers/UpdateUser.Controller.js";
import LoginUser from "../Controllers/UserControllers/LoginUser.Controller.js";
import DeleteUser from "../Controllers/UserControllers/DeleteUser.Controller.js";
import GetAllUsers from "../Controllers/UserControllers/GetAllUsers.Controller.js";
import VerifyJWT from "../middleware/VerifyJWT.js";
import LogoutUser from "../Controllers/UserControllers/LogoutUser.Controller.js";

const router = Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);

router.post("/update-user", VerifyJWT, UpdateUser);
router.delete("/delete/:id", VerifyJWT, DeleteUser);
router.get("/get-all-user", VerifyJWT, GetAllUsers);
router.post("/logout", VerifyJWT, LogoutUser);

export default router;
