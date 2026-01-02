import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const theme = createTheme({
  primaryColor: "teal",
  fontFamily: "Inter, sans-serif",
  colors: {
    dark: [
      "rgb(255,255,255)",
      "rgb(200,200,200)",
      "rgb(100,100,100)",
      "rgb(60,60,60)",
      "rgb(50,50,50)",
      "rgb(40,40,40)",
      "rgb(30,30,30)",
      "rgb(20,20,20)",
      "rgb(10,10,10)",
      "rgb(0,0,0)",
    ],
  },

  headings: {
    fontFamily: "Inter Tight, sans-serif",
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
