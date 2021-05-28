function topTenPrices(topTenData) {
  $("#price_header").replaceWith(
    "Top Currencies by Price" + " (" + topTenData[0].currencyCode + ")"
  );
  $(topTenData).each(function (index, value) {
    let listItem = document.getElementById(`item${index + 1}-price`);
    listItem.innerHTML = "[" + value.coinSymbol + "] " + value.coinPrice;
  });
}

function populateHomePageGraphs(coinSymbol) {
  getCurrencyCode().then(function (code) {
    getTopTenVolume(code).then(function (topTenData) {
      topTenData.sort((a, b) => (a.coinPrice > b.coinPrice ? -1 : 1));
      topTenPrices(topTenData);
      marketCap(topTenData);
      if (coinSymbol === null) {
        coinSymbol = topTenData[0].coinSymbol;
      } else {
        // coinSymbol = localStorage.getItem("coinSymbol");
      }

      getHistoricalData(coinSymbol, code, "day").then(function (dayData) {
        //console.log(dayData);
        dayPriceGraph(dayData);
      });
      getHistoricalData(coinSymbol, code, "week").then(function (res) {
        weekPriceGraph(res);
      });
      getHistoricalData(coinSymbol, code, "month").then(function (monthData) {
        monthPriceGraph(monthData);
      });
    });
  });
  HistoricalDailyBlockChain(coinSymbol).then((res) => {
    blockChainLineGraph(coinSymbol, res);
  });
}

function priceGraphs() {}
