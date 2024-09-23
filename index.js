const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

// Load saved notes from local storage and display them on the screen
getNotes().forEach((note) => {
  const noteEl = createNoteEl(note.id, note.content);
  appEl.insertBefore(noteEl, btnEl);
});

// Function to create a note element with an id and content
function createNoteEl(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty Note";
  element.value = content;

  // Add double-click event listener to delete the note
  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(id, element);
    }
  });

  // Update note content on input change
  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });

  return element;
}

// Function to delete a note by id
function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNotes(notes);
  appEl.removeChild(element);
}

// Function to update note content in localStorage
function updateNote(id, content) {
  const notes = getNotes();
  const target = notes.find((note) => note.id == id);
  if (target) {
    target.content = content;
    saveNotes(notes);
  }
}

// Function to add a new note
function addNote() {
  const notes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const noteEl = createNoteEl(noteObj.id, noteObj.content);
  appEl.insertBefore(noteEl, btnEl);
  notes.push(noteObj);
  saveNotes(notes);
}

// Function to save notes in localStorage
function saveNotes(notes) {
  localStorage.setItem("notes-app", JSON.stringify(notes));
}

// Function to get notes from localStorage
function getNotes() {
  return JSON.parse(localStorage.getItem("notes-app") || "[]");
}

// Add event listener to the button to add a new note
btnEl.addEventListener("click", addNote);
