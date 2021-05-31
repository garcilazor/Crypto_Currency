$(document).ready(function () {
  // We are on home page
  if ($("body").attr("id") === "home") {
    let coinSymbol = null;
    $("#compare-button").click(function () {
      let cur1 = $("#compare1").val().toString().toUpperCase();
      let cur2 = $("#compare2").val().toString().toUpperCase();
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
  }
  // We are on compare page
  if ($("body").attr("id") === "compare") {
    getCurrencyCode().then(function (localCurrency) {
      // console.log(localCurrency);
      let searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has("cur1") && searchParams.has("cur2")) {
        // Parameters were passed in
        let cur1 = searchParams.get("cur1").toUpperCase();
        let cur2 = searchParams.get("cur2").toUpperCase();
        MutlipleSymbolsFullData(cur1, cur2, localCurrency).then((res) => {
          //console.log(res);
          MultiSymbolFullDataChart(res);
          getPricingInfo(cur1, cur2, localCurrency).then((pricingData) => {
            populatePricingTables(pricingData);
          });
        });
        fetchCryptoCoinId(cur1, cur2).then((coinIds) => {
          getCoinSocialMediaActivity(coinIds.coinCode1).then((res) => {
            if (res.General.Name === cur1) {
              populateSocialMediaTable(res, 1);
            } else {
              populateSocialMediaTable(res, 2);
            }
          });
          getCoinSocialMediaActivity(coinIds.coinCode2).then((res) => {
            if (res.General.Name === cur2) {
              populateSocialMediaTable(res, 2);
            } else {
              populateSocialMediaTable(res, 1);
            }
          });
        });
        getInfluencerData(cur1, cur2, 10, 7).then((res) => {
          InfluencerRadarGraph(res);
        });
        getMiningData(cur1, cur2, localCurrency).then((miningObj) => {
          poplateMiningTable(miningObj);
        });
      } else {
        getTopTenVolume(localCurrency).then(function (topTenData) {
          topTenData.sort((a, b) => (a.coinPrice > b.coinPrice ? -1 : 1));
          let cur1 = topTenData[0].coinSymbol;
          let cur2 = topTenData[1].coinSymbol;
          MutlipleSymbolsFullData(cur1, cur2, localCurrency).then((res) => {
            MultiSymbolFullDataChart(res);
          });
          getPricingInfo(cur1, cur2, localCurrency).then((pricingData) => {
            populatePricingTables(pricingData);
          });
          getMiningData(cur1, cur2, localCurrency);
          fetchCryptoCoinId(cur1, cur2).then((coinIds) => {
            getCoinSocialMediaActivity(coinIds.coinCode1).then((res) => {
              if (res.General.Name === cur1) {
                populateSocialMediaTable(res, 1);
              } else {
                populateSocialMediaTable(res, 2);
              }
            });
            getCoinSocialMediaActivity(coinIds.coinCode2).then((res) => {
              if (res.General.Name === cur2) {
                populateSocialMediaTable(res, 2);
              } else {
                populateSocialMediaTable(res, 1);
              }
            });
          });
          getMiningData(cur1, cur2, localCurrency).then((miningObj) => {
            poplateMiningTable(miningObj);
          });
          getInfluencerData(cur1, cur2, 10, 7).then((res) => {
            InfluencerRadarGraph(res);
          });
        });
      }
    });
    // HistoricalDailyBlockChain(coinSymbol).then((res) => {
    //   blockChainLineGraph(coinSymbol, res);
    // });
  }
});

//getHistoricalData("BTC", "USD");
