const express = require("express");
const hbs = require("express-handlebars"); //llamamos al modulo handlebars. motor de plantillas
const path = require("path");
const methodOver = require("method-override");
const flash = require("connect-flash");
const session = require("express-session"); //para variables de sesion en conjunto con connect-flash

//inicializando el servidor express
const app = express();

//CONFIGURACIONES------------------------------------------------------------------------------------------------
//creo la variable port, como variable de entorno no esta definida, usar otro puerto
app.set("PORT", process.env.PORT || 4000); //si no esta definida la variable de entorno PORT usar otro puerto
app.set("views", path.join(__dirname, "views")); //indicamos ubicacion de la carpeta views

//indicamos que el motor de plantillas sera handlebars, y se configura
app.engine(
  ".hbs",
  hbs({
    defaultLayout: "main", //layout por defecto
    layoutsDir: path.join(app.get("views"), "layouts"), //carpeta de layouts
    partialsDir: path.join(app.get("views"), "partials"), //carpeta de partials
    extname: ".hbs", //los archivos creados con el motor tendran extension .hbs
  })
);
app.set("view engine", ".hbs"); //se setea el motor de plantillas configurado para su uso

//MIDDLEWARES---------------------------------------------------------------------------------------------------
app.use(express.urlencoded({ extended: false }));
app.use(methodOver("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
/* puedo usarlo en el req de una peticion al servidor, por ejemplo en los controladores, 
guarda mensajes en el servidor para identificar estados */
app.use(flash());

//VARIABLES GLOBALES
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  next();
});

//RUTAS----------------------------------------------------------
//pido las rutas definidas en routes/index.routes.js,
app.use(require("./routes/index.routes"));

//las rutas del modulo notes, para operaciones CRUD
app.use(require("./routes/notes.routes"));

//carpeta de archivos publicos del servidor
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
