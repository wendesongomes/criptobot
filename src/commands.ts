import { SlashCommandBuilder } from "discord.js";

export const commands = [
  new SlashCommandBuilder()
    .setName("dexscreener")
    .setDescription("Comando para informações de criptomoedas")
    .addStringOption((option) =>
      option
        .setName("pair")
        .setDescription("Informe um link ou ID relacionado à criptomoeda")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("chain")
        .setDescription("Escolha uma cryptomoeda")
        .setRequired(false)
        .addChoices(
          { name: "Moonshot", value: "moonshot" },
          { name: "Solana", value: "solana" },
          { name: "Ethereum", value: "ethereum" },
          { name: "Bsc", value: "bsc" },
          { name: "Arbitrum", value: "arbitrum" },
          { name: "Base", value: "base" },
          { name: "Polygon", value: "polygon" },
          { name: "Tron", value: "tron" },
          { name: "Avalanche", value: "avalanche" },
          { name: "Optimism", value: "optimism" }
        )
    ),
];
