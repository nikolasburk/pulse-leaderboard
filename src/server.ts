import http from "http";
import prisma from "./lib/prisma";
import { Server } from "socket.io";

const httpServer = http.createServer((req, res) => {
  // Define the routes
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Server is running ...");
  } else {
    // Handle 404 Not Found
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

const corsOrigins = [
  process.env.CLIENT_URL ?? "http://localhost:3000",
  "http://localhost:3000",
]
console.log(`cors origins: `, corsOrigins)

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, async () => {
  console.log(`socket.io server is running on port ${PORT}`);
  await subscribeToPlayerUpdates(io);
});

async function subscribeToPlayerUpdates(io: Server) {
  const subscription = await prisma.player.subscribe({});
  if (subscription instanceof Error) {
    throw subscription;
  }

  // Handle Prisma subscription events
  for await (const event of subscription) {
    console.log(`received event: `, event);

    if (event.action === "update") {
      io.sockets.emit("player_points", event);
    }
  }
}
