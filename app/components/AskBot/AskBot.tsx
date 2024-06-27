import { useState, useCallback } from "react";
import { Form } from "@remix-run/react";
import { TextField, Button, Select } from "@shopify/polaris";
import { Bot } from "~/utils/types";

interface Props {
  bot: Bot;
}

export function AskBot({ bot }: Props) {
  const [prompt, setPrompt] = useState("");
  const [promptType, setPromptType] = useState<string>('unknown');

  const handlePromptChange = useCallback(
    (newValue: string) => setPrompt(newValue),
    []
  );

  const handlePromptTypeChange = useCallback(
    (newValue: string) => setPromptType(newValue),
    []
  );

  const promptTypeOptions = [
    { label: 'General', value: 'unknown' },
    { label: "Explain This Code", value: "explain-this-code" },
  ];

  return (
    <div
      style={{
        paddingTop: "1em",
        gap: "1em",
      }}
    >
      <Form method="post">
        <Select
          label="Prompt Type"
          options={promptTypeOptions}
          onChange={handlePromptTypeChange}
          value={promptTypeOptions.find((option) => option.value === promptType)?.value}
          tone="magic"
          name="type"
        />
        <TextField
          label={`prompt-${bot.name}!`}
          value={prompt}
          onChange={handlePromptChange}
          multiline={6}
          autoComplete="off"
          name="prompt"
          labelHidden={true}
          placeholder="Ask me anything!"
        />
        <div style={{ marginTop: "1em" }}>
          <Button submit>Ask</Button>
        </div>
      </Form>
    </div>
  );
}
