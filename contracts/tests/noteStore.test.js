const assert = require("assert");
const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  resetStore,
} = require("../services/noteStore");

function runTests() {
  resetStore();

  const created = createNote({ title: "Test note", content: "Testing" });
  assert.strictEqual(created.title, "Test note");
  assert.strictEqual(typeof created.id, "string");

  const notes = getAllNotes();
  assert.strictEqual(notes.length, 1);
  assert.strictEqual(notes[0].id, created.id);

  const fetched = getNoteById(created.id);
  assert.deepStrictEqual(fetched, created);

  const updated = updateNote(created.id, { title: "Updated" });
  assert.strictEqual(updated.title, "Updated");
  assert.strictEqual(getNoteById(created.id).title, "Updated");

  const deleted = deleteNote(created.id);
  assert.strictEqual(deleted, true);
  assert.strictEqual(getAllNotes().length, 0);

  const missingDelete = deleteNote(created.id);
  assert.strictEqual(missingDelete, false);

  console.log("noteStore tests passed");
}

try {
  runTests();
} catch (error) {
  console.error("noteStore tests failed", error);
  process.exitCode = 1;
}
