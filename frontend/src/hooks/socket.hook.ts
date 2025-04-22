import socket from "@/lib/socket";
import { useEffect, useRef } from "react";

export function useChatSocket(
  roomId?: string,
  onNewMessage?: (msg: any) => void
) {
  const joinedRoom = useRef<string | null>(null);

  useEffect(() => {
    if (!roomId || !onNewMessage) return;

    if (!socket.connected) {
      socket.connect();
    }

    if (joinedRoom.current !== roomId) {
      socket.emit("chat:join", roomId);
      joinedRoom.current = roomId;
    }

    socket.on("chat:message:new", (msg) => onNewMessage(msg));

    return () => {
      socket.off("chat:message:new", onNewMessage);
    };
  }, [roomId, onNewMessage]);
}
