//configuracion de la conexion mongo
require("dotenv").config(); //accedemos a las variables de entorno
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGO; //desde .env traemos cadena de conexion a mongo

//configuramos la conexion a mongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Conectado a MongoDB"))
  .catch((err) => console.log(err));
