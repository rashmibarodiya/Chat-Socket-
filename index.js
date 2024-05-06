
const express = require("express");
const http = require("http")
const app = express();
const { Server } = require("socket.io")
const server = http.createServer(app)
const io = new Server(server)
const { join } = require('node:path');


app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


io.on("connection", (client) => {
  let username = `User${client.id.slice(0, 5)}`; // when user connects on io it has a .id here i took only five intials of that id
  client.on("userMsg",(message) => {
      io.emit("message", `${username}: ${message}`);
  });
});


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});