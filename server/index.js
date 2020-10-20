const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const app = express();
const server = http.createServer(app);
const io = socketio(server); // socket.io实例

const router = require("./router");
const PORT = process.env.PORT || 8088;

app.use(cors());
app.use(router);

io.on("connect", (socket) => {
  console.log("New connection!!!");

  // 接收登录数据并生成一个user
  socket.on("login", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback(error);
    }

    // 如果写在join的callback，将发送给所有本房间的用户端
    socket.join(user.room);

    // 仅登录用户端收到
    socket.emit("message", {
      user: "Admin",
      text: `${user.name}, welcome to the room ${user.room}!`,
    });

    // 将发送给除登录用户外的所有其他本房间的用户端
    socket.broadcast.to(user.room).emit("message", {
      user: "Admin",
      text: `${user.name} has joined!`,
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("User had left!!!");
    const user = removeUser(socket.id); // 拿到离开用户的信息

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
