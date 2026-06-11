export const DEFAULT_CHAT_MODEL: string = "chat-model";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "chat-model",
    name: "Gemini 2.5 Flash",
    description: "Google's fast, highly performant, multimodal assistant",
  },
  {
    id: "chat-model-reasoning",
    name: "Gemini 2.5 Flash Reasoning",
    description: "Flash assistant using reasoning mode for complex financial calculations",
  },
];
