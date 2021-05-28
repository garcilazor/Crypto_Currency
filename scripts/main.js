$(document).ready(function () {
  if ($("body").attr("id") === "home") {
    let coinSymbol = null;
    $("#compare-button").click(function () {
      let cur1 = $("#compare1").val().toString();
      let cur2 = $("#compare2").val().toString();
      let url =
        "./compare.html" +
        "?cur1=" +
        encodeURIComponent(cur1) +
        "&cur2=" +
        encodeURIComponent(cur2);
      window.location.href = url;
    });
    $("#search-button").click(function () {
      coinSymbol = $("#search-content").val();
      populateHomePageGraphs(coinSymbol);
    });
    getNewArticles();
    populateHomePageGraphs(coinSymbol);
    getMiningData("BTC", "ETH", "USD");
  }
  if ($("body").attr("id") === "compare") {
    MutlipleSymbolsFullData("BTC", "ETH", "USD").then((res) => {
      MultiSymbolFullDataChart(res);
    });
    // HistoricalDailyBlockChain(coinSymbol).then((res) => {
    //   blockChainLineGraph(coinSymbol, res);
    // });
  }
});

//getHistoricalData("BTC", "USD");
