import { EmbedBuilder } from "discord.js";
import { formatTimestamp } from "./lib/formatTimestamp";

export const embed = (cryptoData: any) =>
  new EmbedBuilder()
    .setColor("#0099ff")
    .setTitle(
      `${cryptoData.tokenA.name} / ${cryptoData.tokenB.name} ${
        cryptoData.labels
      } (${Math.round(cryptoData.volumeH24 / cryptoData.liquidityUSD)}X)`
    )
    .setDescription(
      `**Pair created:** ${formatTimestamp(cryptoData.pairCreatedAt)}`
    )
    .setThumbnail(cryptoData.imageUrl)
    .addFields(
      { name: "**PRICE USD**", value: cryptoData.priceUsd, inline: true },
      { name: "**MKT CAP**", value: `${cryptoData.marketcap}`, inline: true },
      { name: " ", value: " ", inline: false },
      {
        name: "**24h**",
        value: `**TXNS**: ${cryptoData.txnsH24} \n **VOLUME**: ${cryptoData.volumeH24}`,
        inline: false,
      },
      { name: " ", value: " ", inline: false },
      {
        name: `**${cryptoData.tokenA.name}**`,
        value: `${cryptoData.tokenA.address} \n\n **${cryptoData.tokenA.name} Pooled:** \n${cryptoData.pooledTokenA}`,
        inline: true,
      },
      {
        name: `**${cryptoData.tokenB.name}**`,
        value: `${cryptoData.tokenB.address} \n\n **${cryptoData.tokenB.name} Pooled:** \n${cryptoData.pooledTokenB}`,
        inline: true,
      },
      {
        name: "**Pair**",
        value: `${cryptoData.pairAddress}`,
        inline: true,
      },
      { name: " ", value: " ", inline: false }
    )
    .setTimestamp()
    .setFooter({
      text: "Clique no nome para url",
    })
    .setURL(cryptoData.url);
