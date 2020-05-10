//contiene las rutas o URLs del sitio, se definen aca y luego son llamadas en server.js
const { Router } = require("express");
const router = Router();
//llamo a los metodos del objeto indexController definidos en index.controller
const { renderIndex, renderAbout } = require("../controllers/index.controller");

//ruta por defecto de la aplicacion, el metodo renderIndex renderiza el sitio principal en /views/index.hbs
router.get("/", renderIndex);

//ruta para la seccion about, el metodo renderAbout lo renderiza desde /views/about.hbs
router.get("/about", renderAbout);

module.exports = router;
