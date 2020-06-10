//Middleware para validacion de sesiones de usuarios
const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("errors", "Debes hacer login");
  res.redirect("/users/login");
};

module.exports = helpers;
