import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.number().min(1000).max(65535),
  FRONTEND_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
});

const _env = envSchema.safeParse({
  ...process.env,
  PORT: 3000,
});

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  process.exit(1);
}

export const config = _env.data;

export type Config = z.infer<typeof envSchema>;
