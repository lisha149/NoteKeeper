const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email == "" || password == "") {
    res.status(400);
    throw new Error("Email address or password cannot be empty");
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const updateUserPassword = asyncHandler(async (req, res) => {
  const { old_password, password } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User already exists." });
    }
    // validate old password
    const isValidPassword = await user.matchPassword(old_password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ message: "Please enter correct old password." });
    }
    if (req.body.password) {
      user.password = req.body.password;
    } else {
      return res.status(400).json({ message: "Password Required" });
    }
    const updatedUserPw = await user.save();
    return res.json({
      _id: updatedUserPw._id,
      name: updatedUserPw.name,
      email: updatedUserPw.email,
      pic: updatedUserPw.pic,
      isAdmin: updatedUserPw.isAdmin,
      token: generateToken(updatedUserPw._id),
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = {
  registerUser,
  authUser,
  updateUserProfile,
  updateUserPassword,
};
