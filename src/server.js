const express = require("express");
const path = require("path");

//inicializando el servidor express
const app = express();

//CONFIGURACIONES
//creo la variable port, como variable de entorno no esta definida, usar otro puerto
app.set("PORT", process.env.PORT || 4000); //si no esta definida la variable de entorno PORT usar otro puerto

app.set("views", path.join(__dirname, "views")); //indicamos ubicacion de la carpeta views

//MIDDLEWARES
app.use(express.urlencoded({ extended: false }));

//VARIABLES GLOBALES

//RUTAS
//ruta por defecto del servidor
app.get("/", (req, res) => {
  res.send("Hello World");
});

//carpeta de archivos publicos del servidor
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
