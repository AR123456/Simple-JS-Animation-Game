import asyncHandler from "express-async-handler";
// importing from utils but could put this right in the controller
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// desc auth user and get token
// route  POST /api/user/login
// access  Public
const authUser = asyncHandler(async (req, res) => {
  // destructue email and password from req.body
  const { email, password } = req.body;
  // find user attempting login
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    //
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid");
  }
});

export { authUser };
