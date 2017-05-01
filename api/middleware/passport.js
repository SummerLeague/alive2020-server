var passport = (function(){

  return {
    login : function(req, res, next) {
      return req.app.get("passport").authenticate("login", function (err, user, info) {
        if (err) { return next(err) }
        if (!user) { return res.send(401, { message : info.message }); }

        // Note: calling "logIn" is required for attaching the user to the req object
        //   when using custom callbacks with passport.
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          next();
        });
      })(req, res, next);
    }
  }
})();


module.exports = passport;
