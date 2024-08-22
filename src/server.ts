import { Routes } from "discord.js";
import { env } from "./lib/env";
import { cryptoFetch } from "./lib/cryptoFetch";
import { commands } from "./commands";
import { client, rest } from "./client";
import { embed } from "./embed";

client.on("ready", async () => {
  console.log(`Logou`);

  try {
    await rest.put(Routes.applicationCommands(env.CLIENT_ID), {
      body: commands.map((command) => command.toJSON()),
    });
  } catch (error) {
    console.error(error);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === "dexscreener") {
    const cryptomoeda = options.getString("chain");
    const link = options.getString("address");

    if (link && cryptomoeda) {
      const id = link.split("/")[link.split("/").length - 1];

      const cryptoData = await cryptoFetch(cryptomoeda, id);
      const embedCrypto = embed(cryptoData);
      await interaction.reply({ embeds: [embedCrypto] });
    }
  }
});

client.login(env.TOKEN);
