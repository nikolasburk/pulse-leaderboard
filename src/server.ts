// const http = require("http");
// const { Server } = require("socket.io");
// const prisma = require("./lib/prisma")
import http from "http";
import prisma from "./lib/prisma";
import { Server } from "socket.io";

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", async (socket: any) => {
  console.log("A client connected:", socket.id);
  // socket.on("join_room", (roomId) => {
  //   socket.join(roomId);
  //   console.log(`user with id-${socket.id} joined room - ${roomId}`);
  // });

  const subscription = await prisma.player.subscribe();
  for await (const event of subscription) {
    // socket.on("send_msg", (data) => {
    //   console.log(data, "DATA");
    //   //This will send a message to a specific room ID
    //   socket.to(data.roomId).emit("receive_msg", data);
    // });
    console.log(`received event: `, event);
    socket.emit("player_points", event);
  }

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
