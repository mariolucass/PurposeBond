import socket from "@/lib/socket";
import { useEffect, useRef } from "react";

export function useChatSocket(
  roomId?: string,
  onNewMessage?: (msg: any) => void
) {
  const joinedRoom = useRef<string | null>(null);

  useEffect(() => {
    if (!roomId || !onNewMessage) return;

    if (joinedRoom.current !== roomId) {
      socket.connect();
      socket.emit("joinRoom", roomId);
      joinedRoom.current = roomId;
    }

    socket.on("newMessage", onNewMessage);

    return () => {
      socket.off("newMessage", onNewMessage);
    };
  }, [roomId, onNewMessage]);
}
