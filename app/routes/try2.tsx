import { THE_ROCK_BIO } from "~/utils/roles/system/therock";
import { BotIntro } from "~/components/BotIntro";
import { PromptBuilder } from '~/components/PromptBuilder/PromptBuilder';
import { json } from '@remix-run/react';

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  console.log("[ACTION] formData", formData);
  const code = formData.get("code") as string;
  console.log("code", code);
  return json({ response: code });
};


export default function Index() {
  // const actionData = useActionData<{ response: string }>();


  return (
    <BotLayout>
      <BotIntro bot={THE_ROCK_BIO} data={"Let me explain some code for you."} />
      <PromptBuilder type={'explain'}/>
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
