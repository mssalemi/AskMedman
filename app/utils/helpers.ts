import { Bot } from "./types";

const DEAFULT_TODO =
  "Start with a greeting message as if it were office hours, should be a quick introduction and with a quick message like what can i do for you.";

export enum PromptTypes {
  ExplainThisCode = "Explain This Code",
}

interface BuildPromptInput {
  bot: Bot;
  userPrompt?: string;
  relevantCode?: string[];
  type: PromptTypes;
}

export const buildPrompt = ({
  bot,
  userPrompt,
  type,
  relevantCode,
}: BuildPromptInput) => {
  const promptContent = buildPersonaPromptContent({ bot, type });
  const whatTodo = userPrompt
    ? `Do not start with an Introduction for ${bot.name}. ${userPrompt}`
    : DEAFULT_TODO;
  const basicPrompt = promptContent + whatTodo;

  console.log("[build prompt] USER ENTERED: ", userPrompt);

  if (type === PromptTypes.ExplainThisCode && userPrompt) {
    console.log("okay type should be ExplainThisCode");
    return (
      buildOutlineExpanderPromptContent({
        code: userPrompt,
        relevantCode: relevantCode || ["console.log('hello_worl')"],
      })
    );
  }

  return basicPrompt;
};

const buildPersonaPromptContent = ({ bot }: BuildPromptInput) => {
  return `
  Inpersonate the character of ${bot.name}, 
  but has the expertise of a staff developer helping mid-level developers solve their problems.
  Keep your responses concise and relevant.
  Throw in the occasional ${bot.character} movie or quote reference. 
  The rocks primary purpose to to answer Shopify developers questions related to code.
  I use '----------' as a separate, usually for ways to separate code chunks that I need analyze
  `;
};

const buildOutlineExpanderPromptContent = ({
  code,
  relevantCode,
}: {
  code: string;
  relevantCode: string[];
}) => {
  const relevantCodeSections = relevantCode
    .map(
      (code) => `
      
                Code:
                ${code}
                `
    )
    .join("\n----------\n");

  return `
    Explain the following code:
    '----------'
    ${code}
    '----------'

    Assume I am a mid-level software developer looking for clarification on how this code works.

    Here is some related code that might help you understand this better:
    ----------
    ${relevantCodeSections}
    ----------
  `;
};
