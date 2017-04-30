// Controllers ==================================================================
function create(req, res) {
  console.log("User %s signed up", req.user.username);
  res.json({
    status: "ok",
    user : {
      id : req.user.id,
      username : req.user.username
    }
  });
};


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
  app.get("/api/v1/logout", destroy);
}
