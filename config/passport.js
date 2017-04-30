var path = require("path"),
    passportLocal = require("passport-local"),
    LocalStrategy = passportLocal.Strategy,
    localStrategyOptions = {
      passReqToCallback : true
    };


module.exports = function configPassport(passport, User) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
    return null;
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({ where : { id : id } }).then(function(user) {
      done(null, user);
      return null;
    }).catch(function(err) {
      done(err, user);
      return null;
    });
  });

  passport.use("local-signup", new LocalStrategy(localStrategyOptions, function(req, username, password, done) {
    process.nextTick(function() {
      User.findOne({ where : { username : username } }).then(function(user) {
        if (user) {
          //return done(null, false, { message : "Username already taken." });
          return null;
        } else {
          let newUser = User.build({
            username : username,
            password : User.generateHash(password),
          });

          return newUser.save();
        }
      }).then(function(newUser) {
        done(null, newUser);
        return null;
      }).catch(function(err) {
        console.log("Err %s". err);
        done(err);
        return null;
      });

    });
  }));

  passport.use("local-login", new LocalStrategy(localStrategyOptions, function(req, username, password, done) {
    User.findOne({ where : { username : username } }).then(function(user) {
      var authErrorMessage = "Incorrect username or password";
      if (!user) {
        done(null, false, { message : authErrorMessage });
        return null;
      }

      if (!user.validPassword(password)) {
        done(null, false, { message : authErrorMessage });
        return null;
      }

      done(null, user);
      return null;
    }).catch(function(err) {
      done(err);
      return null;
    });

  }));

};
