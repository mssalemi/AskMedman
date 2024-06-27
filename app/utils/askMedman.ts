import fetch from "node-fetch";
import { THE_ROCK, THE_ROCK_BIO } from "./roles/system/therock";
import { OPENAI_API_KEY, OPENAI_CHAT_URL } from "./env.server";
import { PromptTypes, buildPrompt } from "./helpers";
const DEFAULT_TEMPERATURE = 0.2;
const DEFAULT_MODEL = "gpt-4-0613";
const DEFAULT_MAX_TOKENS = 2000;

interface OpenAIResponse {
  choices: { message: { content: string } }[];
}

export const askMedman = async (prompt: {
  content: string;
  type?: string;
  relevantCodeBlocks?: string[];
}): Promise<string | null> => {
  if (!prompt) {
    console.error("Prompt is required");
    return null;
  }

  console.log("[PROMPT] being used ==== ", prompt);

  const promptContent = buildPrompt({
    bot: THE_ROCK_BIO,
    userPrompt: prompt.content,
    type: (prompt?.type as PromptTypes) || "unknown",
    relevantCode: prompt.relevantCodeBlocks,
  });

  const messages = [
    {
      role: "system",
      content: THE_ROCK.content,
    },
    {
      role: "user",
      content: prompt.content,
    },
  ];

  const data = {
    temperature: DEFAULT_TEMPERATURE,
    model: DEFAULT_MODEL,
    messages: messages,
    max_tokens: DEFAULT_MAX_TOKENS,
  };

  // console.log("Request Data:", data)

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  // console.log("Request Headers:", options.headers);
  // console.log("Request Body Size:", JSON.stringify(data).length);

  try {
    const response = await fetch(OPENAI_CHAT_URL, options);
    const result = (await response.json()) as OpenAIResponse;
    // console.log("Result", result);

    if (result.choices && result.choices.length > 0) {
      const firstChoice = result.choices[0].message;
      // console.log("results choices", result.choices)
      // console.log("FirstChoiceResponse", firstChoice);
      return firstChoice.content;
    } else {
      console.log("No valid choices returned.");
      return "No valid response received from Alfred.";
    }
  } catch (error) {
    console.error("Error making the request", error);
    return "An error occurred while asking Alfred.";
  }
};
