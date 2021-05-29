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
}

function poplateMiningTable(miningObj) {
  $("#launchDate1").text(miningObj[0].launchDate);
  $("#blockNumber1").text(miningObj[0].blockNumber);
  $("#blockReward1").text(miningObj[0].blockReward);
  $("#blockTime1").text(miningObj[0].blockTime);
  $("#maxSupply1").text(miningObj[0].maxSupply);
  $("#totalCoins1").text(miningObj[0].totalCoinsMined);
}
