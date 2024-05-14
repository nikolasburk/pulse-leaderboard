import http from "http";
import prisma from "./lib/prisma";
import { Server, Socket } from "socket.io";

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, async () => {
  console.log(`Socket.io server is running on port ${PORT}`);
  await subscribeToChanges(io)
});



async function subscribeToChanges(io: Server) {
  const subscription = await prisma.player.subscribe();
  if (subscription instanceof Error) {
    throw subscription;
  }

  // Handle Prisma subscription events
  for await (const event of subscription) {
    console.log(`received event: `, event);
    io.sockets.emit("player_points", event);
  }
}