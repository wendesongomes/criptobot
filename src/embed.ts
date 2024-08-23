import { EmbedBuilder } from "discord.js";
import { formatTimestamp } from "./lib/formatTimestamp";
import { formatNumber } from "./formatNumber";

export const embed = (cryptoData: any) =>
  new EmbedBuilder()
    .setColor("#0099ff")
    .setTitle(
      `${cryptoData.tokenA.name} / ${cryptoData.tokenB.name} ${
        cryptoData.labels ? cryptoData.labels : ""
      } (${Math.round(cryptoData.volumeH24 / cryptoData.liquidityUSD)}X)`
    )
    .setDescription(
      `**Pair created:** ${
        cryptoData.pairCreatedAt
          ? formatTimestamp(cryptoData.pairCreatedAt)
          : "Sem dados"
      }`
    )
    .setThumbnail(cryptoData.imageUrl)
    .addFields(
      { name: "**PRICE USD**", value: cryptoData.priceUsd, inline: true },
      {
        name: "**MKT CAP**",
        value: `${formatNumber(cryptoData.marketcap)}`,
        inline: true,
      },
      { name: " ", value: " ", inline: false },
      {
        name: "**24h**",
        value: `**TXNS**: ${formatNumber(
          cryptoData.txnsH24
        )} \n **VOLUME**: ${formatNumber(cryptoData.volumeH24)}`,
        inline: false,
      },
      { name: " ", value: " ", inline: false },
      {
        name: `**${cryptoData.tokenA.name}**`,
        value: `${cryptoData.tokenA.address} \n\n **${
          cryptoData.tokenA.name
        } Pooled:** \n${formatNumber(cryptoData.pooledTokenA)}`,
        inline: true,
      },
      {
        name: `**${cryptoData.tokenB.name}**`,
        value: `${cryptoData.tokenB.address} \n\n **${
          cryptoData.tokenB.name
        } Pooled:** \n${formatNumber(cryptoData.pooledTokenB)}`,
        inline: true,
      },
      {
        name: "**Pair**",
        value: `${cryptoData.pairAddress}`,
        inline: true,
      },
      { name: " ", value: " ", inline: false },
      {
        name: "**Sociais**",
        value: `${cryptoData.socials
          .map((social) => `**${social.type}**: ${social.url}`)
          .join("\n")}`,
        inline: true,
      }
    )
    .setTimestamp()
    .setFooter({
      text: "Bugs ou Features chame no twitter - @WendesonDev",
    })
    .setURL(cryptoData.url);
