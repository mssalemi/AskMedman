import { Card } from '@shopify/polaris';
import React from "react";

export function LatestResponse({ response }: { response: string | undefined }) {
  if (!response) return null;

  return (
    <Card>
        <div
          style={{
            display: "flex",
            gap: "2em",
          }}
        >
          <StyledOutput response={response} />
        </div>
    </Card>
  );
}


function encodeHTML(str:string) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
}

const preStyle = {
  whiteSpace: 'pre-wrap', // Wraps white spaces and preserves line breaks
  overflow: 'hidden', // Hides any overflowing content
  maxWidth: '100%', // Ensures the component does not exceed the container width // Includes padding and border in the element's total width and height
};

function StyledOutput({ response }: {
  response: string;
}) {
  const encodedResponse = encodeHTML(response).replace(/\n/g, '<br />');

  return (
    <pre style={preStyle} dangerouslySetInnerHTML={{ __html: encodedResponse }} />
  );
}
