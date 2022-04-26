// validate the token
import jwt from "jsonwebtoken";
// use async express handler to handle errors
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  // init token
  let token;
  //will send this through headers in the
  //Authorization Key's value as a Bearer token
  //   console.log(req.headers.authorization);
  // put in check for Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // token found try to decode it
    try {
      //remove the word Bearer from the token
      token = req.headers.authorization.split(" ")[1];
      // pass in the token and secret to decode
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      next();
    } catch (error) {
      //
    }
  }
  if (!token) {
    // 401 is not authorized
    res.status(401);
    throw new Error("Not authorized no token");
  }
});
// use protect in userRoute
export { protect };
