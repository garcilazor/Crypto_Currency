$(document).ready(function () {
  getNewArticles();
  getTopTenVolume("USD").then(function (topTenData) {
    topTenData.sort((a, b) => (a.coinPrice > b.coinPrice ? -1 : 1));
    topTenPrices(topTenData);
    marketCap(topTenData);
  });
  HistoricalDailyBlockChain("BTC").then((res) => {
    blockChainLineGraph("BTC", res);
  });
});

//getHistoricalData("BTC", "USD");
