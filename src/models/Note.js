//modelo  de datos para las notas que se crearan en la aplicacion
const { Schema, model } = require("mongoose");

const NoteSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: String, required: true },
  },

  {
    timestamps: true, //agrega por defecto campos created_at y updated_at
  }
);
module.exports = model("Note", NoteSchema);
