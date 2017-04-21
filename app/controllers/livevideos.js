// Controllers ==================================================================
function create(req, res) {
  console.log(req.files);
  res.send(200);
};


// Exports ======================================================================
module.exports = function(app) {
  app.post('/api/v1/livevideos', create);
}
