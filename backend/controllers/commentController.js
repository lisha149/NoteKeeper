const Comment = require("../models/commentModel");
const Note = require("../models/noteModel");

// Create new comment
const createComment = async (req, res, next) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    const { commentContent } = req.body;
    // Save comment
    const comment = new Comment({
      user: req.user,
      commentContent: commentContent,
      created: new Date(),
    });
    const createdComment = await comment.save();
    res.status(201).json(createdComment);
  } else {
    res.status(404);
    throw new Error("Comment in Error");
  }
};
// const createComment = (req, res, next) => {
//   return res.status(200).send({
//     message: "Comment Successfully Added",
//     data: {},
//   });
// };
module.exports = { createComment };
