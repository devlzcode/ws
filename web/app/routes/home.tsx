import { useWebSocket } from "../context/ws";

export default function Home() {
  const { sendMessage, lastMessage, isConnected } = useWebSocket();
  return (
    <div>
      <button onClick={() => sendMessage(JSON.stringify({ type: "ping" }))}>
        Send Ping
      </button>
      <p>Last Message: {lastMessage}</p>
      <p>Is Connected: {isConnected ? "Yes" : "No"}</p>
    </div>
  );
}
