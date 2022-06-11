const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async (req, res) => {
  console.log(req.query);
  const isDraft = (req.query["is_draft"] ?? "").toLowerCase() === "true";
  console.log(isDraft);
  const query = {
    $or: [{ user: req.user }, { visibility: "PUBLIC" }],
    $and: [{ status: isDraft ? "DRAFT" : "PUBLISHED" }],
  };
  console.log(query);
  const notes = await Note.find(query);

  res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category, visibility, status } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please fill in all the feilds");
  } else {
    const note = new Note({
      user: req.user,
      title,
      content,
      category,
      visibility,
      status,
    });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category, visibility } = req.body;

  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;
    note.visibility = visibility;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    await note.remove();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});
module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };
