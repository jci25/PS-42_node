var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var SerialPort = require("serialport").SerialPort;
var serialport = require("serialport");
// list serial ports:
serialport.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
  });
});

io.on('connection', function(socket){
//io.emit('chat message', 'HEY');
  socket.on('chat message', function(msg){
    //io.emit('chat message', msg);
    console.log(msg);
  });
});

http.listen(8888, function(){
  console.log('listening on *:8888');
});

var serialport = new SerialPort("/dev/ttyACM0", {
   baudRate: 9600,
   // look for return and newline at the end of each data packet:
   parser: serialport.parsers.readline("\r\n")
 });
serialport.on('open', function(){
  console.log('Serial Port Opend');
  serialport.on('data', function(data){
      io.emit('chat message', data);
      console.log(data);
  });
});

//for testing, we're just going to send data to the client every second
setInterval( function() {

  /*
    our message we want to send to the client: in this case it's just a random
    number that we generate on the server
  */
  var msg = Math.random();
  io.emit('other', msg);
  console.log (msg);

}, 1000);
