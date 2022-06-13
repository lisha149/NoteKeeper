const mongoose = require("mongoose");
const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    category: {
      type: String,
    },
    visibility: {
      type: String,
      enum: ["PUBLIC", "PRIVATE"],
      default: "PRIVATE",
    },
    status: {
      type: String,
      enum: ["PUBLISHED", "DRAFT"],
      default: "PUBLISHED",
    },

    user: {
      type: Object,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
