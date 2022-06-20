const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    user: {
      type: Object,
      required: true,
      ref: "User",
    },
    commentContent: { type: String },
    created: { type: Date },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
