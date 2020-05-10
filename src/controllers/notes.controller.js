//archivo con la logica CRUD del modulo de notas de la aplicacion
const notesController = {};

//despliega un formulario para añadir una nueva nota
notesController.renderNoteForm = (req, res) => {
  res.send("note add");
};

module.exports = notesController;
