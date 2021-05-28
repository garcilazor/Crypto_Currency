$(document).ready(function () {
  // We are on home page
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
  // We are on compare page
  if ($("body").attr("id") === "compare") {
    MutlipleSymbolsFullData("BTC", "ETH", "USD").then((res) => {
      MultiSymbolFullDataChart(res);
    });
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("cur1") && searchParams.has("cur2")) {
      // Parameters were passed in
      let cur1 = searchParams.get("cur1");
      let cur2 = searchParams.get("cur2");
      console.log(cur1, cur2);
    } else {
      // No parameters, populate with default values
    }
    // HistoricalDailyBlockChain(coinSymbol).then((res) => {
    //   blockChainLineGraph(coinSymbol, res);
    // });
  }
});

//getHistoricalData("BTC", "USD");
