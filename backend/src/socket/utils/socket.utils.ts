export function getRoomId(message: any): string {
  return [message.sender.id, message.receiver.id].sort().join("-");
}
