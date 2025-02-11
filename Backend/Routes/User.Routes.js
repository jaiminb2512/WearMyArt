import { Router } from "express";
import RegisterUser from "../Controllers/UserControllers/RegisterUser.Controller.js";
import UpdateUser from "../Controllers/UserControllers/UpdateUser.Controller.js";
import LoginUser from "../Controllers/UserControllers/LoginUser.Controller.js";
import DeleteUser from "../Controllers/UserControllers/DeleteUser.Controller.js";
import GetAllUsers from "../Controllers/UserControllers/GetAllUsers.Controller.js";
import auth from "../middleware/auth.js";
import LogoutUser from "../Controllers/UserControllers/LogoutUser.Controller.js";

const router = Router();

// Open routes
router.post("/register", RegisterUser);
router.post("/login", LoginUser);

// Protected routes (auth middleware added)
router.post("/update-user", auth, UpdateUser);
router.delete("/delete/:id", auth, DeleteUser);
router.get("/get-all-user", auth, GetAllUsers);
router.post("/logout", auth, LogoutUser);

export default router;
