var path = require("path"),
    passportMiddleware = require(path.resolve("api/middleware")).passport;


// Actions ======================================================================
function login(req, res) {
  var models = req.app.get("models"),
      username = req.body.username,
      password = req.body.password;
console.log(username);
console.log(password);
  models.User.findOne({ where : { $or : [{ username : username }, { email : username }] } }).then(function(user) {
    if (!user || !user.validPassword(password)) {
      return res.send(422, { message : "Incorrect username or password." });
    }

    return res.send(200, {
      user : {
        id : user.id,
        username : user.username,
        email : user.email,
        token : user.generateJWTToken()
      }
    });
  }).catch(function(err) {
    console.log(err);
    next(err);
  });
}

function me(req, res) {
  console.log("Me is %s", req.user.username);
  return res.send(200, {
    user : {
      id : req.user.id,
      username : req.user.username,
      email : req.user.email,
      token : req.user.generateJWTToken()
    }
  });
}

function destroy(req, res) {
  req.logout();
  return res.send(200, { message : "Session destroyed." });
}


// Exports ======================================================================
module.exports = function(app) {
  app.get("/api/v1/me", passportMiddleware.authenticate, me);
  app.post("/api/v1/login", login);
  app.get("/api/v1/logout", destroy);
}
