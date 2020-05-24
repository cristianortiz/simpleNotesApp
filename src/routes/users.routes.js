const { Router } = require("express");
const router = Router();
const {
  signup,
  renderSignUpForm,
  loginUser,
  logout,
  loginForm,
} = require("../controllers/users.controller");

router.get("/users/signup", renderSignUpForm); //ruta form de registro
router.post("/users/signup", signup); //ruta metodo que guarda nuevo usuario
router.get("/users/login", loginForm); //ruta formulario de login
router.post("/users/login-user", loginUser); //logea a un usuario
router.get("/users/logout", logout); //cierra sesion de usuario
module.exports = router;
