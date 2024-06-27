import { useState, useEffect } from "react";
import { LoaderFunction, json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { AskBot } from "~/components/AskBot";
import { askMedman } from "~/utils/askMedman";
import { Thumbnail, Text, Card, Spinner } from "@shopify/polaris";
import { ALFRED_BIO } from "~/utils/roles/system/alfred";
import { THE_ROCK, THE_ROCK_BIO } from "~/utils/roles/system/therock";
import BotControl from "~/components/BotControl";
import { LatestResponse } from "~/components/LatestResponse";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const prompt = formData.get("prompt") as string;

  const response = await askMedman(prompt);

  return json({ response });
};

export const loader: LoaderFunction = async () => {
  const initialResponse = await askMedman("Explain who you are!?");
  return json(initialResponse);
};

// Custom hook for typing effect
const useTypingEffect = (text: string, speed: number = 50) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return displayedText;
};

export default function Index() {
  const actionData = useActionData<{ response: string }>();
  const loaderData = useLoaderData<string | undefined>();

  console.log("action data", actionData?.response);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2em',
    }}>
      <BotControl bot={THE_ROCK_BIO} data={loaderData} />
      <AskBot />
      <LatestResponse response={actionData?.response} />
    </ div>
  );
}
