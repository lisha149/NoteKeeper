const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
  comment: {
    type: String,
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Note;
