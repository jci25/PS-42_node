var exec = require('child_process').exec;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
<<<<<<< HEAD
var socket = require('socket.io-client')('http://10.8.0.6:8888');

socket.on('connect', function(){
   console.log("connect");
});
socket.on('arduino', function(data){
	io.emit('arduino', data);
});
socket.on('mav', function(data){
        io.emit('mav', data);
=======
var SerialPort = require("serialport").SerialPort;
var serialport = require("serialport");
var mav_data = "Battery : 100.00, Heading : 0, Roll : 0.0, Pitch : 0.0, Yaw : 0.0";
var ard_data = "WaterTemp : -4059.40, Depth : 0.00, Humidity : 0.00, HullTemp : 32.00, Inches : 0.00";
// list serial ports:
serialport.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
  });
>>>>>>> 7a1da8a435da200024815b2c9a8ab86dc682f054
});



io.on('connection', function(socket){
io.emit('chat message', 'HEY');
  socket.on('chat message', function(msg){
    //io.emit('chat message', msg);
    console.log(msg);
  });
});

http.listen(8888, function(){
  console.log('listening on *:8888');
});
<<<<<<< HEAD
=======

var serialport = new SerialPort("/dev/ttyACM0", {
   baudRate: 9600,
   // look for return and newline at the end of each data packet:
   parser: serialport.parsers.readline("\r\n")
 });
serialport.on('open', function(){
  console.log('Serial Port Opend');
  serialport.on('data', function(data){
//      console.log(data);
      ard_data = data;
//      io.emit('mav', mav_data);
      io.emit('arduino', ard_data);
//      console.log(data);
  });
});

//for testing, we're just going to send data to the client every second
setInterval( function() {

  exec("python /home/pi/NEMO/python/PS-42_python/mav_reader.py", function(error, stdout, stderr){
  	mav_data = stdout;
	io.emit('mav', mav_data);
//	io.emit('arduino', ard_data);
//	console.log(stdout);
  });

}, 2400);
>>>>>>> 7a1da8a435da200024815b2c9a8ab86dc682f054
