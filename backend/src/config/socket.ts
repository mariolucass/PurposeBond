import { app } from "@/app";
import { registerChatHandlers } from "@/socket";
import { createAdapter } from "@socket.io/redis-adapter";
import http from "http";
import { createClient } from "redis";
import { Server } from "socket.io";
import { corsOptionsInServer } from "./cors";

export const setupWebSocket = async (httpServer: http.Server) => {
  const io = new Server(httpServer, corsOptionsInServer);

  const pubClient = createClient({ url: "redis://localhost:6379" });
  const subClient = pubClient.duplicate();

  await pubClient.connect();
  await subClient.connect();

  io.adapter(createAdapter(pubClient, subClient));

  app.set("io", io);

  io.on("connection", (socket) => {
    registerChatHandlers(io, socket);
  });

  return io;
};
