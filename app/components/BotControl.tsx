import { Card, Text } from '@shopify/polaris';
import React from "react";

interface Bot {
  name: string;
  avatarUrl: string;
}

interface Props {
  bot: Bot;
  data: string | undefined;
}

function BotControl({ bot, data }: Props) {
  return (
    <Card>
      <div
        style={{
          padding: "1em",
        }}
      >
        <Text variant="headingMd" as="h6">
          {`Chat with ${bot.name}!`}
        </Text>

        <div
          style={{
            paddingTop: "1em",
            display: "flex",
            gap: "2em",
            alignItems: "center",
          }}
        >
          <img
            style={{
              height: "125px",
              borderRadius: "50%",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              maxWidth: "100%",
              objectFit: "cover",
            }}
            src={bot.avatarUrl}
            alt={`${bot.name}`}
          />

          <p>{data}</p>
        </div>
      </div>
    </Card>
  );
}

export default BotControl;
