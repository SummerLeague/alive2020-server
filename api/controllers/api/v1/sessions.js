var path = require("path"),
    passportMiddleware = require(path.resolve("api/middleware")).passport;


// Actions ======================================================================
function login(req, res) {
  return res.send(200, {
    user : {
      id : req.user.id,
      username : req.user.username,
      email : req.user.email
    }
  });
}

function me(req, res) {
  console.log(`Me is ${req.user}`);
  if(!req.user){
    res.json({ user : null });
  } else {
    res.json({
      user : {
        username : req.user.username
      }
    });
  }
}

function destroy(req, res) {
  req.logout();
  res.json({status: "ok"});
}


// Exports ======================================================================
module.exports = function(app) {
  app.get("/api/v1/me", me);
  app.post("/api/v1/login", passportMiddleware.login, login);
  app.get("/api/v1/logout", destroy);
}
