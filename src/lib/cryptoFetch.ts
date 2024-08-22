export const cryptoFetch = async (cryptoMoeda: string, link: string) => {
  const response = await fetch(
    `https://api.dexscreener.com/latest/dex/pairs/${cryptoMoeda}/${link}`
  );

  const data = await response.json();

  const pairInfo = data.pairs[0];

  const url = pairInfo.url;
  const priceUsd = pairInfo.priceUsd;
  const txnsH24 = pairInfo.txns.h24.buys + pairInfo.txns.h24.sells;
  const volumeH24 = pairInfo.volume.h24;
  const pairCreatedAt = pairInfo.pairCreatedAt;
  const pooledTokenA = pairInfo.liquidity.base;
  const pooledTokenB = pairInfo.liquidity.quote;
  const liquidityUSD = pairInfo.liquidity.usd;
  const pairAddress = pairInfo.pairAddress;
  const tokenA = pairInfo.baseToken;
  const tokenB = pairInfo.quoteToken;
  const chainId = pairInfo.chainId;
  const imageUrl = pairInfo.info.imageUrl;
  const marketcap = pairInfo.fdv;
  const labels = data.pair.labels;

  return {
    labels,
    marketcap,
    imageUrl,
    liquidityUSD,
    chainId,
    url,
    priceUsd,
    txnsH24,
    volumeH24,
    pairCreatedAt,
    pooledTokenA,
    pooledTokenB,
    pairAddress,
    tokenA,
    tokenB,
  };
};
