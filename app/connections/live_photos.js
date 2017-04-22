// Setup ========================================================================
var io = null,
    newLivePhotos = [];


// Controllers ==================================================================
function send (livePhoto) {
  newLivePhotos.push(livePhoto);
}

// Emission Event 'Loop' ==========================================================
function emit () {
	if (newLivePhotos.length) {
	  io.sockets.emit("livePhotos", newLivePhotos);
	  newLivePhotos = [];
	}
	// Call self. This is effectively a loop.
	setTimeout(emit, 100);
}


// Exports ======================================================================
function setup (ioConnection) {
  io = ioConnection;

  io.set("heartbeat interval", 4);

  io.sockets.on("connection", function (socket) {
    emit();
  });
}

module.exports = {
  setup : setup,
  send : send
}
