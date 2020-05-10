const { Router } = require("express");
const router = Router();

//importo los metodos del objeto notes.controller, que seran llamados por las rutas para las operaciones CRUD
const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");

//ruta para desplegar un form para agregar una nota, llama al metodo renderNoteForm de /controllers/notes.controller
router.get("/notes/add", renderNoteForm);

router.post("/notes/new-note", createNewNote); //ruta que procesa el formulario de nueva nota

router.get("/notes", renderNotes); //lista todas las notas

router.get("/notes/edit/:id", renderEditForm); //renderiza formulario para edita nota con su id

router.put("/notes/edit/:id", updateNote); //procesa el formulario y actualiza la nota, usa metodo put
//router.post("notes/edit/:id", );

router.delete("/notes/delete/:id", deleteNote); //elimuna una nota usa metodo delete
//router.post("notes/delete/:id", );

module.exports = router;
