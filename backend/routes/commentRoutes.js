const express = require("express");
const { createComment } = require("../controllers/commentController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();
router.route("/:id/comments/create").post(protect, createComment);
module.exports = router;
