var path = require("path"),
    StoriesSearchService = require(path.resolve("api/services/api/v1/stories_search_service"));


// Actions ======================================================================
async function index(req, res, next) {
  var models = req.app.get("models");

  // TODO: Improve and servicify.
  var userId = isNaN(req.query.userId) ? null : req.query.userId;
  var username = req.query.username && String(req.query.username);

  try {
    var user = await models.User.findOne({ where : { $or : [{ id : userId }, { username : username  }]}});

    if (!user) {
      return res.send(404, { status : 404, message : "No user found for the received parameters." });
    }

    // TODO/Dev Note: This service stuff is temporary and sloppy with this userId manipulation. Fix this but do it at the right time.
    req.query.userId = user.id;

    var searchService = new StoriesSearchService(req);

    var responseBody = await searchService.search();

    return res.send(200, responseBody);
  } catch (err) {
    next(err);
  }
}

async function primaryStory(req, res, next) {
  var models = req.app.get("models");

  // TODO: Improve and servicify.
  var userId = isNaN(req.query.userId) ? null : req.query.userId;
  var username = req.query.username && String(req.query.username);

  try {
    var user = await models.User.findOne({ where : { $or : [{ id : userId  }, { username : username  }]}});

    if (!user) {
      return res.send(404, { status : 404, message : "No user found for the received parameters." });
    }

    var primaryStory = await user.primaryStory();

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
  } catch (err) {
    next(err);
  }
}


// Exports ======================================================================
module.exports = function(app, passport) {
  app.get("/api/v1/stories", index)
  app.get("/api/v1/stories/primary_story", primaryStory);
}
