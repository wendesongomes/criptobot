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
    const link = options.getString("pair");

    if (cryptomoeda && link) {
      const id = link.split("/")[link.split("/").length - 1];

      const cryptoData = await cryptoFetch(cryptomoeda, id);
      const embedCrypto = embed(cryptoData);
      await interaction.reply({ embeds: [embedCrypto] });
    }

    if (link) {
      const id = link.split("/")[link.split("/").length - 1];
      const cryptomoeda = link.split("/")[link.split("/").length - 2];

      const cryptoData = await cryptoFetch(cryptomoeda, id);
      const embedCrypto = embed(cryptoData);
      await interaction.reply({ embeds: [embedCrypto] });
    }
  }

  if (commandName === "pools") {
    const cryptomoeda: string | null = options.getString("chain");

    if (!cryptomoeda) {
      return interaction.reply("Cryptomoeda é obrigatória");
    }

    const response = await fetch(
      `https://dexscreen-pools.vercel.app/api/webhook`
    );

    const { data } = await response.json();

    const dataFilter = data.filter((data) => data.chain === cryptomoeda);

    await interaction.reply(
      `Encontrado ${dataFilter.length} resultados para a chain ${cryptomoeda}.`
    );

    const poolsList = [];
    dataFilter.forEach((item) => {
      item.pools.forEach((pool) => {
        poolsList.push(pool);
      });
    });

    // Agrupa os pools em lotes de 10
    const chunkedPools = [];
    for (let i = 0; i < poolsList.length; i += 10) {
      chunkedPools.push(poolsList.slice(i, i + 10));
    }

    // Envia uma mensagem para cada lote de 10 pools
    for (const [index, chunk] of chunkedPools.entries()) {
      const message = chunk
        .map(
          (pool, idx) =>
            `**Rank ${index * 10 + idx + 1}**\n` +
            `📈 **Name:** ${pool.name} (${pool.proporcao})\n` +
            `💧 **Liquidez 24h:** ${pool.liquidity24h}\n` +
            `🔄 **Volume 24h:** ${pool.volume24h}\n` +
            `🔗 **URL:** [Link](${pool.url})\n\n`
        )
        .join("");

      // Envia o lote de 10 pools
      await interaction.followUp(message);
    }
  }
});

client.login(env.TOKEN);
