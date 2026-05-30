import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const authMiddleware = async (req, res, next) => {
  try {
    let token;
    console.log("auth middleware started...");

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.substring(7);

      const payload = await jwt.verify(token, process.env.JWT_SECRET);
      const user = User.findOne({ _id: payload.id });
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
