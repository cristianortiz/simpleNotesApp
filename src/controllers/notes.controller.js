const Note = require("../models/Note"); //importo el modelo para Note con todas sus operaciones
//archivo con la logica CRUD del modulo de notas de la aplicacion
const notesController = {};

//despliega un formulario para añadir una nueva nota
notesController.renderNoteForm = (req, res) => {
  res.render("notes/new-note");
};
//recibe lso datos del form new-note y los guarda en bd
notesController.createNewNote = async (req, res) => {
  const { title, description } = req.body; //obtenemos lo datos del formulario

  //notacion resumida de title:title,description:descrpcion
  const newNote = new Note({ title, description });
  //guardamos id del usuario que crea la nota
  newNote.user = req.user.id;
  await newNote.save(); //guardo la nueva nota en BD
  req.flash("success_msg", "Nota Agregada Correctamente"); //guarda el mensaje en el servidor
  res.redirect("/notes");
};

//lista todas las notas
notesController.renderNotes = async (req, res) => {
  /*obtiene de bd todas las notas, con lean() se transforma el documento moongose retornado
   por find() en objeto plano de JS, evita errores de handlebars */
  const notes = await Note.find({ user: req.user.id })
    .sort({ createdAt: "desc" })
    .lean();
  /* const notesContext = notes.map((note) => {
    return { title: note.title, description: note.description };
  }); */

  //se le pas a la vista all-notes las notas desde BD y se renderiza all-notes
  res.render("notes/all-notes", { notes });
};

//despliega formulario para editar una nota
notesController.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  //si el usuario intena ver notas de otro via url lo redirije a sus propias notas
  if (note.user != req.user.id) {
    req.flash("error_msg", "no autorizado");
    return res.redirect("/notes");
  }
  res.render("notes/edit-note", { note });
};

//procesa los datos del form de edicio de una nota
notesController.updateNote = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Nota Editada Correctamente");
  res.redirect("/notes");
};

notesController.deleteNote = async (req, res) => {
  console.log(req.params.id);
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Nota Eliminada");
  res.redirect("/notes");
};

module.exports = notesController;
