//const Users=require('../models')
const usersController = {};
const User = require("../models/User");
const passport = require("passport");

//renderiza un form de registro nuevo usuario
usersController.renderSignUpForm = (req, res) => {
  res.render("users/signup");
};

//guarda los datos de un nuevo usuario
usersController.signup = async (req, res) => {
  const errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    req.flash("error_msg");
    errors.push({ text: "Password no coinciden" });
  }
  if (password.length < 4) {
    errors.push({ text: "Password debe tener minimo 4 caracteres" });
  }
  if (errors.length > 0) {
    res.render("users/signup", { errors, name, email });
  } else {
    const emailUser = await User.findOne({ email: email }); //si encuentro un usuario con email igual a otro ya existente
    if (emailUser) {
      req.flash("error_msg", errors.push({ text: "El email ya esta en uso" }));
      res.render("users/signup", { errors, name, email });
    } else {
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "tu usuario ha sido creado correctamente");
      res.redirect("/users/login");
    }
  }
};

usersController.loginForm = (req, res) => {
  res.render("users/login");
};

/* llamamos passport para el login del usuario en config/passport, */
usersController.loginUser = passport.authenticate("local", {
  failureRedirect: "/users/login", //si el login falla se redirecciona al login form
  successRedirect: "/notes", //si el login es exitoso redirije al modulo de notas
  failureFlash: true,
});

usersController.logout = (req, res) => {
  res.send("login");
};
module.exports = usersController;
