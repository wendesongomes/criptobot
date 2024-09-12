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
        .setDescription("Escolha uma criptomoeda")
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

  new SlashCommandBuilder()
    .setName("pools")
    .setDescription("Comando para visualizar pools de liquidez")
    .addStringOption((option) =>
      option
        .setName("chain")
        .setDescription("Escolha a blockchain da pool")
        .setRequired(false)
        .addChoices(
          { name: "Ethereum", value: "ethereum" },
          { name: "Base", value: "base" },
          { name: "Solana", value: "solana" },
          { name: "Solana/orca", value: "solana/orca" },
          { name: "Solana/raydium", value: "solana/raydium" }
        )
    ),
];
