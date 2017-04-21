var sendLivePhoto = require("../connections/live_photos").send;

// Controllers ==================================================================
function create(req, res) {
  sendLivePhoto(req.files);
  res.send(200);
};


// Exports ======================================================================
module.exports = function(app) {
  app.post('/api/v1/live_photos', create);
}
