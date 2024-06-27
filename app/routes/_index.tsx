import { useState, useEffect } from "react";
import { LoaderFunction, json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { AskBot } from "~/components/AskBot/index";
import { askMedman } from "~/utils/askMedman";
import { THE_ROCK_BIO } from "~/utils/roles/system/therock";
import { BotIntro } from "~/components/BotIntro";
import { LatestResponse } from "~/components/LatestResponse";
import { buildPrompt, PromptTypes } from '~/utils/helpers';

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  console.log("[ACTION] formData", formData);
  let prompt = formData.get("prompt") as string;
  const promptType = formData.get("type");

  console.log("prompt", prompt);
  console.log("promptType", promptType);



  if (promptType === "explain-this-code") {
    console.log("building explain prompt", promptType);
    prompt = buildPrompt({
      bot: THE_ROCK_BIO,
      userPrompt: prompt,
      type: PromptTypes.ExplainThisCode,
    });
  }

  const response = await askMedman(prompt);

  return json({ response });
};

export const loader: LoaderFunction = async () => {
  const initialResponse = await askMedman({content: "Explain who you are!?"});
  return json({ initialResponse });
};

export default function Index() {
  const loaderData = useLoaderData<{ initialResponse: string }>();
  const actionData = useActionData<{ response: string }>();

  const [initialResponse, setInitialResponse] = useState(loaderData.initialResponse);

  useEffect(() => {
    if (actionData?.response) {
      setInitialResponse(actionData.response);
    }
  }, [actionData?.response]);

  return (
    <BotLayout>
      <BotIntro bot={THE_ROCK_BIO} data={initialResponse} />
      <AskBot bot={THE_ROCK_BIO} />
      <LatestResponse response={actionData?.response} />
    </BotLayout>
  );
}

const BotLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2em",
      }}
    >
      {children}
    </div>
  );
};
