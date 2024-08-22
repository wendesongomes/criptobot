import { Client, GatewayIntentBits, REST } from "discord.js";
import { env } from "./lib/env";

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

export const rest = new REST({ version: "10" }).setToken(env.TOKEN);
