$(document).ready(function () {
  let coinSymbol = null;
  $("#search-button").click(function () {
    coinSymbol = $("#search-content").val();
    populateHomePageGraphs(coinSymbol);
  });
  getNewArticles();
  populateHomePageGraphs(coinSymbol);
  MutlipleSymbolsFullData("BTC", "ETH", "USD").then((res) => {
    MultiSymbolFullDataChart(res);
  });
  getMiningData("BTC", "ETH", "USD");
});

//getHistoricalData("BTC", "USD");
