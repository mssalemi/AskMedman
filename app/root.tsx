import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,

  LiveReload
} from "@remix-run/react";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page} from "@shopify/polaris";

import styles from "@shopify/polaris/build/esm/styles.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <Page title="Ask Dwayne">
        <Outlet />
      </Page>
    </AppProvider>
  );
}
