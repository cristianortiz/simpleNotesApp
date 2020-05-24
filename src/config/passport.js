const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; //modulo para usar passport con una BD local
const User = require("../models/User");

//creamos un objeto LocalStrategy de passport que recibe un usuario y una contraseña, luego una funcion los procesa
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      // si existe el email, devuelve un modelo User, por lo tanto podemos usar los metodos del mismo
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "no se encuentra el usuario" });
      }
      //se usa el metodo matchPassword para compara contraseñas, que definimos en el modelo User
      else {
        const match = await user.matchPassword(password);
        if (match) {
          return done(null, user); //valida y crea sesion con los datos del usuario
        } else {
          return done(null, false, { message: "Password incorrecta" });
        }
      }
    }
  )
);
//verifica las sesiones del usurio
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
