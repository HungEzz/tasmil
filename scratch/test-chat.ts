import { POST } from "../src/app/(main)/defi-agent/api/chat/route";
import * as authModule from "../src/app/(auth)/auth";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// Override auth() to mock a guest user session
(authModule as any).auth = async () => {
  return {
    user: {
      id: "5f55f60a-91f7-41c9-a3d4-0764b4fc982f",
      type: "guest",
    },
  };
};

async function runTest() {
  const reqBody = {
    id: "dd216055-77d2-4442-a871-acde8e4df248",
    message: {
      id: "11111111-2222-3333-4444-555555555555",
      role: "user",
      parts: [
        {
          type: "text",
          text: "what tokens type you can transfer?",
        },
      ],
    },
    selectedChatModel: "chat-model",
    selectedVisibilityType: "private",
    walletAddress: "0xc85be78306706db4491b29cd88151cda951427558d319797dfed12e21a7d2f00",
    tasmilAddress: "0x11d60fb4d1702dec35f0da11cc254822d4a3d04c85729d112de39b541bf4c4e1",
  };

  const req = new Request("http://localhost:3000/defi-agent/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });

  console.log("Invoking POST route...");
  const res = await POST(req);
  console.log("Status:", res.status);
  
  if (res.body) {
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      console.log("CHUNK:", decoder.decode(value, { stream: true }));
    }
  } else {
    console.log("No body returned!");
  }
}

runTest().catch(console.error);
