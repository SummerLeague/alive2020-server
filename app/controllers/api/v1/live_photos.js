var fs = require("file-system"),
    https = require("https"),
    BodyParser = require("body-parser"),
    jsonParser = BodyParser.json(),
    MessageValidator = require("sns-validator"),
    validator = new MessageValidator();
    sendLivePhoto = require("../../../connections/live_photos").send;


// Controllers ==================================================================
function create(req, res) {
  var tmpPath = req.files.thumbnail.path,
      targetPath = "./public/images/live_photos/" + req.files.thumbnail.name;

  fs.rename(tmpPath, targetPath, function(err) {
    if (err) throw err;

    fs.unlink(tmpPath, function() {
      if (err) throw err;

      sendLivePhoto({
        name : req.files.thumbnail.fieldName,
        path : "images/live_photos/" + req.files.thumbnail.name
      });
    });
  });

  res.send(200);
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
module.exports = function(app) {
  app.post("/api/v1/live_photos", create);
  app.post("/api/v1/live_photos/", create);
  app.post("/api/v1/transcode_complete_webhook", transcode_complete_webhook);
}
