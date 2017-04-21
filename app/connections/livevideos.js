// Setup ========================================================================
var io = null,
    newLivevideos = [];


// Controllers ==================================================================
function newLivevideo (livevideo) {
  newLivevideos.push(livevideo);
}

// Emission Event 'Loop' ==========================================================
// NOTE: This loop is intended to improve performance by limiting the emission of
//   tweets to clients to every tenth of a second rather than on every livevideo.
function emit () {
	if (newLivevideos.length) {
	  io.sockets.emit("livevideos", newLivevideos);
	  newLivevideos = [];
	}
	// Call self. This is effectively a loop.
	setTimeout(emit, 100);
}


// Exports ======================================================================
function setup (io) {
  io.set("heartbeat interval", 4);

  io.sockets.on('connection', function (socket) {
    emit();
  });
}

module.exports = setup;
