import { Card, TextField, Text, Button } from "@shopify/polaris";
import React, { useState, useCallback } from "react";
import { Form } from "@remix-run/react";

interface Props {
  type: "explain" | "unknown";
}

export function PromptBuilder({ type }: Props) {
  const [codeToExplain, setCodeToExplain] = useState("");
  const [relevantCode, setRelevantCode] = useState<string[]>([]);

  const handleMainCodeChange = useCallback(
    (newValue: string) => setCodeToExplain(newValue),
    []
  );
  return (
    <Card>
      <Form method="post">
        <Text variant="headingXl" as="h6">
          Prompt Builder
        </Text>
        <TextField
          label="Code"
          name="code"
          value={codeToExplain}
          onChange={handleMainCodeChange}
          autoComplete="off"
          multiline={10}
          placeholder="Enter your code here..."
        />
        <div style={{ marginTop: "1em" }}>
          <Button submit>Ask</Button>
        </div>
      </Form>
    </Card>
  );
}
