import { defineConfig } from "orval";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  "api-docs": {
    input: process.env.VITE_BACKEND_URL + "/docs/json",
    output: {
      client: "zod",
      mode: "split",
      target: "./src/gen/schemas/",
      schemas: "./src/gen/types/",
    },
  },
});
