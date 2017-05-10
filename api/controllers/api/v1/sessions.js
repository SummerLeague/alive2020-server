// Actions ======================================================================
function login(req, res, next) {
  var models = req.app.get("models"),
      username = req.body.username,
      password = req.body.password;

  models.User.findOne({ where : { $or : [{ username : username }, { email : username }] } }).then(function(user) {
    if (!user || !user.validPassword(password)) {
      return res.send(422, { message : "Incorrect username or password." });
    }

    return res.send(200, {
      user : {
        id : user.id,
        username : user.username,
        email : user.email,
        authToken : user.generateJWTToken()
      }
    });
  }).catch(function(err) {
    console.log(err);
    next(err);
  });
}

function destroy(req, res) {
  req.logout();

  return res.send(200, { message : "Token destroyed." });
}


// Exports ======================================================================
module.exports = function(app) {
  app.post("/api/v1/login", login);
  app.get("/api/v1/logout", destroy);
}
