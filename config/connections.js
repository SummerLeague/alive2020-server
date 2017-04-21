module.exports = function(io) {
  // API ==========================================================================
  [
    'live_photos'
  ].forEach(function(connectionName) {
    require('app/connections/' + connectionName).setup(io);
  });

  io.sockets.on('connection', function(socket) {
  	socket.emit('init', {
	    message: 'Successfully connected.'
	  });
  });
};
