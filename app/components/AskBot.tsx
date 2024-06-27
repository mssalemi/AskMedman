import {useState, useCallback} from "react";
import { Form } from "@remix-run/react";
import {TextField, Button} from '@shopify/polaris';
import { THE_ROCK_BIO } from '~/utils/roles/system/therock';



export function AskBot() {
  const [promt, setPrompt] = useState('');

  const handleChange = useCallback(
    (newValue: string) => setPrompt(newValue),
    [],
  );

  return (
    <div style={{
      paddingTop: '1em',
    }}>
      <Form method="post">
        <TextField
            label={`prompt-${THE_ROCK_BIO.name}!`}
            value={promt}
            onChange={handleChange}
            multiline={4}
            autoComplete="off"
            name="prompt"
            labelHidden={true}
            placeholder='Ask me anything!'
          />
        <div style={{ marginTop: '1em' }}>
          <Button submit>Ask</Button>
        </div>
      </Form>
    </div>
  );
}
