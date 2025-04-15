import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();

const app = new Hono();

app.get("/", (c) => c.text("Hello World"));

app.get(
  "/ws",
  upgradeWebSocket(async (c) => {
    return {
      onMessage(evt, ws) {
        let data =
          evt.data instanceof Uint8Array
            ? new TextDecoder().decode(evt.data)
            : String(evt.data);
        const message = JSON.parse(data);
        if (message.type === "ping") {
          ws.send(JSON.stringify({ type: "pong" }));
        }
      },
    };
  })
);

export default {
  fetch: app.fetch,
  websocket,
};
