var sendLivePhoto = require("../connections/live_photos").send,
    fs = require('file-system');

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


// Exports ======================================================================
module.exports = function(app) {
  app.post("/api/v1/live_photos", create);
}
