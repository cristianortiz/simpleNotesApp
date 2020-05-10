//archivo con la logica CRUD del modulo de notas de la aplicacion
const notesController = {};

//despliega un formulario para añadir una nueva nota
notesController.renderNoteForm = (req, res) => {
  res.render("notes/new-note");
};

notesController.createNewNote = (req, res) => {
  console.log(req.body);
  res.send("procesar nueva nota");
};

//lista todas las notas
notesController.renderNotes = (req, res) => {
  res.send("lista de notas");
};

notesController.renderEditForm = (req, res) => {
  res.send("render edit form");
};

notesController.updateNote = (req, res) => {
  res.send("update note");
};

notesController.deleteNote = (req, res) => {
  res.send("elimina una  nota");
};

module.exports = notesController;
