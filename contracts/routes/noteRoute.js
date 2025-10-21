const express = require("express");
const {
  createNote,
  getNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById,
} = require("../controllers/noteController");

const router = express.Router();

router.route("/")
  .get(getNotes)
  .post(createNote);

router.route("/:id")
  .get(getNoteById)
  .put(updateNoteById)
  .delete(deleteNoteById);

module.exports = router;
