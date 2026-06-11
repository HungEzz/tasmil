import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  console.log("Using API key:", apiKey ? apiKey.substring(0, 10) + "..." : "undefined");
  
  const model = google("gemini-2.5-flash");
  const response = await generateText({
    model,
    prompt: "what tokens type you can transfer?",
  });
  console.log("Response:", response.text);
}

main().catch(console.error);
