const { Router } = require("express");
const router = Router();

//importo los metodos del objeto notes.controller, que seran llamados por las rutas para las operaciones CRUD
const { renderNoteForm } = require("../controllers/notes.controller");
//ruta para desplegar un form para agregar una nota, llama al metodo renderNoteForm de /controllers/notes.controller
router.get("/notes/add", renderNoteForm);
module.exports = router;
