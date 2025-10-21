let notes = [];
let nextId = 1;

function generateId() {
  return String(nextId++);
}

function createNote({ title, content }) {
  const timestamp = new Date().toISOString();
  const note = {
    id: generateId(),
    title,
    content,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  notes.push(note);
  return note;
}

function getAllNotes() {
  return notes.map((note) => ({ ...note }));
}

function getNoteById(id) {
  const note = notes.find((item) => item.id === String(id));
  return note ? { ...note } : null;
}

function updateNote(id, payload) {
  const index = notes.findIndex((item) => item.id === String(id));

  if (index === -1) {
    return null;
  }

  const updated = {
    ...notes[index],
    ...payload,
    updatedAt: new Date().toISOString(),
  };

  notes[index] = updated;
  return { ...updated };
}

function deleteNote(id) {
  const index = notes.findIndex((item) => item.id === String(id));

  if (index === -1) {
    return false;
  }

  notes.splice(index, 1);
  return true;
}

function resetStore() {
  notes = [];
  nextId = 1;
}

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  resetStore,
};
