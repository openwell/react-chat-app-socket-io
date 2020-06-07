var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.send("hello world");
});

io.on("connection", function(socket) {
  socket.on("chat message", function(data) {
    
    io.emit('chat message', data)
  });
});

http.listen(3001, function() {
  console.log("listening on port *:3001");
});