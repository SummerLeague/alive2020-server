var path = require("path");


// Actions ======================================================================
function primaryStory(req, res, next) {
  var models = req.app.get("models");

  models.User.findOne({ where : { id : req.params.user_id } }).then(function(user) {
    if (!user) {
      return res.send(404);
    }

    user.primaryStory().then(function (primaryStory) {
      if (primaryStory) {
        req.app.render("story", { data : primaryStory }, function(err, storyJson) {
          if (err) {
            throw(err);
          }

          return res.send(200, {
            story : storyJson
          });
        });
      } else {
        return res.send(200, {
          story : null
        });
      }
    }).catch(function(err) {
      throw(err);
    });


  }).catch(function(err) {
    console.log(err);
    next(err);
  });
}

// Exports ======================================================================
module.exports = function(app, passport) {
  app.get("/api/v1/users/:user_id/stories/primary_story", primaryStory);
}
