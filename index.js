const express = require('express');
const app = express();
const http = require('http');
const path= require('path');
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server); //io instance

 //one can refer to the official documentation
//socket io handle (these are important lines )
io.on("connection", (socket) => {
    socket.on("msg", message=>{
        console.log("A new user message", message);
        io.emit("message", message);
    })
  });


app.use(express.static(path.resolve("./public")));
app.get('/', (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});