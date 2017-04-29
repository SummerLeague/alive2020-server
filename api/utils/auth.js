var path = require("path"),
    passport = require("passport"),
    passportLocalSequelize = require('passport-local-sequelize'),
    models = require(path.resolve("api/models"));


// Setup token based authentication strategy
// TODO

// Setup username/password based authentication strategy
var genericAuthErrorMessage = "Incorrect username or password.";

passportLocalSequelize.attachToUser(models.User, {
  usernameField : "username",
  hashField : "passwordHash",
  saltField : "passwordSalt",
  IncorrectPasswordError : genericAuthErrorMessage,
  IncorrectUsernameError : genericAuthErrorMessage,
  MissingUsernameError : "Please provide a username.",
  MissingPasswordError : "Password cannot be blank."
});

passport.use(models.User.createStrategy());
passport.serializeUser(models.User.serializeUser());
passport.deserializeUser(models.User.deserializeUser());


module.exports = {
  initialize : function() {
    return passport.initialize();
  },
  session : function() {
    return passport.session();
  }
};
