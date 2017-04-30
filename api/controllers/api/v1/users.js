// Controllers ==================================================================
function create(req, res) {
  console.log("User %s signed up", req.user.username);
  res.json({
    status : "ok",
    user : {
      id : req.user.id,
      username : req.user.username
    }
  });
};


// Exports ======================================================================
module.exports = function(app) {
  app.post("/api/v1/users", app.get("passport").authenticate("local-signup"), create);
}
