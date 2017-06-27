var path = require("path"),
    StoriesSearchService = require(path.resolve("api/services/api/v1/stories_search_service"));


// Actions ======================================================================
function index(req, res, next) {
  var models = req.app.get("models"),
      searchService = new StoriesSearchService(req);

  searchService.search().then(function (responseBody) {
    return res.send(200, responseBody);
  }).catch(function(err) {
    throw(err);
  });
}

function primaryStory(req, res, next) {
  var models = req.app.get("models");

  models.User.findOne({ where : { id : req.params.userId } }).then(function(user) {
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
  app.get("/api/v1/users/:userId/stories", index)
  app.get("/api/v1/users/:userId/stories/primary_story", primaryStory);
}
