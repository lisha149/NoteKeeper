const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
  updateUserPassword,
} = require("../controllers/userControllers");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile);
router.route("/change-password").post(protect, updateUserPassword);
module.exports = router;
