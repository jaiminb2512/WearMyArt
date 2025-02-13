import jwt from "jsonwebtoken";
import ApiResponse from "../Utils/ApiResponse.js";

const VerifyAdmin = function (req, res, next) {
  const token = req.cookies?.Authorization || req.header("Authorization");

  if (!token) {
    return ApiResponse(res, false, null, "No token, authorization denied", 401);
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    if (!decoded.isAdmin) {
      return ApiResponse(res, false, null, "You are not authorized", 403);
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return ApiResponse(res, false, null, "Token is not valid", 401);
  }
};

export default VerifyAdmin;
