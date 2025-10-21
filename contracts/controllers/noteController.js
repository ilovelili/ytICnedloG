const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../services/noteStore");

exports.createNote = (req, res) => {
  const { title, content } = req.body || {};

  if (typeof title !== "string" || typeof content !== "string") {
    return res.status(400).json({
      success: false,
      message: "Both title and content must be provided as strings.",
    });
  }

  const note = createNote({ title, content });

  return res.status(201).json({
    success: true,
    data: note,
  });
};

exports.getNotes = (_req, res) => {
  const notes = getAllNotes();

  return res.status(200).json({
    success: true,
    data: notes,
  });
};

exports.getNoteById = (req, res) => {
  const { id } = req.params;
  const note = getNoteById(id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found.",
    });
  }

  return res.status(200).json({
    success: true,
    data: note,
  });
};

exports.updateNoteById = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body || {};

  const updates = {};

  if (typeof title === "string") {
    updates.title = title;
  }

  if (typeof content === "string") {
    updates.content = content;
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one of title or content must be provided for update.",
    });
  }

  const updated = updateNote(id, updates);

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: "Note not found.",
    });
  }

  return res.status(200).json({
    success: true,
    data: updated,
  });
};

exports.deleteNoteById = (req, res) => {
  const { id } = req.params;

  const wasDeleted = deleteNote(id);

  if (!wasDeleted) {
    return res.status(404).json({
      success: false,
      message: "Note not found.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Note deleted successfully.",
  });
};
