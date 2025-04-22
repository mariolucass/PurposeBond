import { Server, Socket } from "socket.io";
import { getRoomId } from "../utils/socket.utils";

export const registerChatHandlers = (io: Server, socket: Socket) => {
  socket.on("chat:join", async (roomId: string) => socket.join(roomId));

  socket.on("chat:leave", (roomId: string) => socket.leave(roomId));

  socket.on("chat:message:create", (message) => {
    const roomId = getRoomId(message);
    io.to(roomId).emit("chat:message:new", message);
  });
};
