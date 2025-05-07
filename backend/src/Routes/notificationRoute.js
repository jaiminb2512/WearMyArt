import { Router } from "express";
import tokenVerification from "../middleware/tokenVerification.js";
import {
  getAllNotification,
  markAsRead,
  markAllAsRead,
} from "../controllers/notificationController.js";

const router = Router();

router.get("/get-notifications", tokenVerification, getAllNotification);
router.patch("/read", tokenVerification, markAsRead);
router.patch("/read-all", tokenVerification, markAllAsRead);

export default router;
