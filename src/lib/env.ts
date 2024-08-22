import { z } from "zod";

const envSchema = z.object({
  CLIENT_ID: z.string(),
  TOKEN: z.string(),
});

export const env = envSchema.parse(process.env);
