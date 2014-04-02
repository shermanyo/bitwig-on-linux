// scratchpad.control.js

loadAPI(1);

host.defineController("sherman", "scratchpad", "1.0", "1dece780-ba4d-11e3-a5e2-0800200c9a66");
host.defineMidiPorts(1, 1);

String.prototype.getBytes = function () {
  var bytes = [];
  for (var i = 0; i < this.length; ++i) {
    bytes.push(this.charCodeAt(i));
  }
  return bytes;
};

//
// Callbacks
//

function init()
{

  println("sandbox - init()");

  host.getMidiInPort(0).setMidiCallback(onMidi);
  host.getMidiInPort(0).setSysexCallback(onSysex);

  host.showPopupNotification("scratchpad loaded");
}


function exit()
{
}


function onMidi(status, data1, data2)
{
  // Create connection with callback definition
  host.connectToRemoteHost('127.0.0.1', 58008, function(conn) {
 
    var messagetxt = "midi event - " + status + " " + data1 + " " + data2;

    println(messagetxt);
    conn.send(messagetxt.getBytes());
    conn.disconnect();

  });
}


function onSysex(data)
{
}
