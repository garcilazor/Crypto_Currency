$(document).ready(function () {
  getNewArticles();
  getCurrencyCode().then(function (code) {
    getTopTenVolume("USD").then(function (topTenData) {
      topTenData.sort((a, b) => (a.coinPrice > b.coinPrice ? -1 : 1));
      topTenPrices(topTenData);
      marketCap(topTenData);

      getHistoricalData(topTenData[0].coinSymbol, code, "day").then(function (
        dayData
      ) {
        //console.log(dayData);
        dayPriceGraph(dayData);
      });
      getHistoricalData(topTenData[0].coinSymbol, code, "week").then(function (
        res
      ) {
        weekPriceGraph(res);
      });
      getHistoricalData(topTenData[0].coinSymbol, code, "month").then(function (
        monthData
      ) {
        monthPriceGraph(monthData);
      });
    });
  });
  HistoricalDailyBlockChain("BTC").then((res) => {
    blockChainLineGraph("BTC", res);
  });
  MutlipleSymbolsFullData("BTC", "ETH", "USD").then((res) => {
    MultiSymbolFullDataChart(res);
  });
  getMiningData("BTC", "ETH", "USD");
});

//getHistoricalData("BTC", "USD");
