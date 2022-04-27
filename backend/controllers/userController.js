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
// @desc register a new user
// #route  POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // destructure email and password from req.body
  const { name, email, password } = req.body;
  // find user attempting login
  const userExists = await User.findOne({ email });
  if (userExists) {
    // bad request
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    // the object we want to add
    name,
    email,
    password,
  });
  if (user) {
    // 201 something created
    res.status(201).json({
      // here want to authenticate right after registering
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    //something went wrong with validation
    res.status(400);
    throw new Error("Invalid user data");
  }
});
// @desc Get user profile
// @route  GET /api/user/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // get id of logged in user
  const user = await User.findById(req.user._id);
  // check for user
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Use profile not found");
  }
});

export { authUser, getUserProfile, registerUser };
