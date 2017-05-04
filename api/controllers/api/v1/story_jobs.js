var https = require("https"),
    BodyParser = require("body-parser"),
    jsonParser = BodyParser.json(),
    MessageValidator = require("sns-validator"),
    validator = new MessageValidator(),
    Sequelize = require("sequelize");


// Controllers ==================================================================
function create(req, res) {
  var models = req.app.get("models"),
      userId = req.user.id;

  models.StoryJob.create({
    userId : userId
  })
  .then(function() {
    return res.send(200, {
      storyJob : {
        referenceId : this.referenceId
      }
    });
  })
  .catch(Sequelize.ValidationError, function (err) {
    var error = err.errors[0],
        message = error ? error.message : "Invalid parameters."

    return res.send(422, { message : message });
  }).catch(function(err) {
    next(err);
  });
};

function transcode_complete_webhook(req, res) {
  if (!req.body) {
    res.send(400);
    return;
  }

  validator.validate(req.body, function (err, message) {
    if (err) {
      console.error(err);
      res.send(400);
      return;
    }

    if (message["Type"] === "SubscriptionConfirmation") {
      https.get(message["SubscribeURL"], function (res) {
        // Confirmed your endpoint subscription (required).
      });
    }

    if (message["Type"] === "UnsubscribeConfirmation") {
      https.get(message["SubscribeURL"], function (res) {
        // AWS action has unsubscribed your endpoint for SNS notifications.
      });
    }

    if (message["Type"] === "Notification") {
      // Do whatever you want with the message body and data.
      console.log(message["MessageId"] + ": " + message["Message"]);
    }

    res.send(200);
  });
}


// Exports ======================================================================
module.exports = function(app, passport) {
  app.post("/api/v1/story_jobs", passport.authenticate("authenticate-JWT"), create);
  app.post("/api/v1/story_jobs/transcode_complete_webhook", transcode_complete_webhook);
}
