const indexController = {}; //objeto con metodos

//metodo que renderiza el sitio principal main.hbs
indexController.renderIndex = (req, res) => {
  res.render("index");
};
//metodo que renderiza la seccion about de about.hbs
indexController.renderAbout = (req, res) => {
  res.render("about");
};

module.exports = indexController;
