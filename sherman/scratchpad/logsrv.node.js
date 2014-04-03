// logsrv.node.js
//
// run:
// $ node logsrv.node.js
// Listening on 127.0.0.1:58008 ...

var net = require('net');
var fs = require('fs');
var tmpfilepath = '/tmp/logsrv.txt';

// Create our socket
var server = net.createServer(
  function (socket) {

    // Callback when data is received
    socket.on('data', function(data) {

      var messagetxt = "";

      // Convert bytes to string      for(var i = 0; i < data.length; i++) {
        messagetxt += String.fromCharCode(data[i]);
      }

      // Print message to console
      console.log(messagetxt);

      // Write message to file
      fs.writeFile(tmpfilepath, messagetxt, function(err) {
        if(err) { console.error("Write error: %s", err); }
      });

    });
  }

);

// Start server
console.log("Listening on 127.0.0.1:58008 ...");
server.listen(58008, '127.0.0.1');
