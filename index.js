
const express = require("express");
const http = require("http")
const app = express();
const {Server} = require("socket.io")
const server= http.createServer(app)
const io = new Server(server)
const { join } = require('node:path');

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });

  io.on("connection", (client) => {
    client.on("userMsg",(mes) => {
        io.emit("message",mes)
    })
  })
  
  server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });