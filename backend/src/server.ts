import http from "http";
import { app } from "./app";
import { setupWebSocket } from "./config/socket";

const port = process.env.PORT || 3000;
const socketPort = process.env.PORTSOCKET || 3333;

const server = http.createServer(app);

setupWebSocket(server)
  .then(() => {
    console.log("WebSocket successfully started.");
  })
  .catch((err) => {
    console.error("WebSocket error:", err);
  });

app.listen(port, async () => {
  console.log(`API successfully started at port ${port}`);
});

server.listen(socketPort, () => {
  console.log(`HTTP started at port http://localhost:${socketPort}`);
});
