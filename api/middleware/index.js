var passport = require("passport");


// Middelware ===================================================================
function requireAuth(req, res, next) {
  passport.authenticate("token", function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({message: "Incorrect token credentials"});
    }

    req.user = user;
    next();
  });
}

function notFound(req, res) {
  res.send(404);
}


// Exports ======================================================================
module.exports = {
  notFound: notFound
};
