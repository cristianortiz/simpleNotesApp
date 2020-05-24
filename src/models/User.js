const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestaps: true,
  }
);

//agrego un metodo al objeto UserSchema para encryptar el campo password
UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); //salt para el cifrado
  return await bcrypt.hash(password, salt);
};
//uso function para poder usar this.. y asi comparar el campo password en bd con el que llega como parametro
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = model("User", UserSchema);
