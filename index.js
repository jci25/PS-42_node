var exec = require('child_process').exec;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socket = require('socket.io-client')('http://10.8.0.6:8888');

socket.on('connect', function(){
   console.log("connect");
});
socket.on('arduino', function(data){
	io.emit('arduino', data);
});
socket.on('mav', function(data){
        io.emit('mav', data);
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
