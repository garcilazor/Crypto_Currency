$(document).ready(function () {
  // We are on home page
  if ($("body").attr("id") === "home") {
    let coinSymbol = null;
    $(".list-group-item").click(function () {
      coinSymbol = $(this).text().split(" ")[0].split("[")[1].split("]")[0];
      populateHomePageGraphs(coinSymbol);
      $("#home_title").text("Currency data for: " + coinSymbol);
    });
    $("#compare-button").click(function () {
      let url = null;
      let cur1 = $("#compare1").val().toString().toUpperCase();
      let cur2 = $("#compare2").val().toString().toUpperCase();
      if (!cur1 || !cur2) {
        url = "./compare.html";
        window.location.href = url;
      } else {
        url =
          "./compare.html" +
          "?cur1=" +
          encodeURIComponent(cur1) +
          "&cur2=" +
          encodeURIComponent(cur2);
      }
      window.location.href = url;
    });
    $("#search-button").click(function () {
      coinSymbol = $("#search-content").val();
      populateHomePageGraphs(coinSymbol);
      $("#home_title").text("Currency data for: " + coinSymbol);
    });
    getNewArticles();
    populateHomePageGraphs(coinSymbol);
  }
  // We are on compare page
  if ($("body").attr("id") === "compare") {
    $("#compare-button").click(function () {
      let url = null;
      let cur1 = $("#compare1").val().toString().toUpperCase();
      let cur2 = $("#compare2").val().toString().toUpperCase();
      if (!cur1 || !cur2) {
        url = "./compare.html";
        window.location.href = url;
      } else {
        url =
          "./compare.html" +
          "?cur1=" +
          encodeURIComponent(cur1) +
          "&cur2=" +
          encodeURIComponent(cur2);
      }
      window.location.href = url;
    });
    getCurrencyCode().then(function (localCurrency) {
      // console.log(localCurrency);
      let searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has("cur1") && searchParams.has("cur2")) {
        // Parameters were passed in
        let cur1 = searchParams.get("cur1").toUpperCase();
        let cur2 = searchParams.get("cur2").toUpperCase();
        $("#compare_title").text(
          "Currency Comparison: " + cur1 + " vs " + cur2
        );
        HistoricalDailyBlockChain(cur1).then((res) => {
          blockChainLineGraph(cur1, 1, res);
        });
        HistoricalDailyBlockChain(cur2).then((res) => {
          blockChainLineGraph(cur2, 2, res);
        });
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
        //$("#pricingData").click(pricingDataClick());
        // $("#miningData").click(miningDataClick());
        // $("#socialData").click(socialDataClick());
      } else {
        getTopTenVolume(localCurrency).then(function (topTenData) {
          topTenData.sort((a, b) => (a.coinPrice > b.coinPrice ? -1 : 1));
          let cur1 = topTenData[0].coinSymbol;
          let cur2 = topTenData[1].coinSymbol;
          $("#compare_title").text(
            "Currency Comparison: " + cur1 + " vs " + cur2
          );
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
          HistoricalDailyBlockChain(cur1).then((res) => {
            blockChainLineGraph(cur1, 1, res);
          });
          HistoricalDailyBlockChain(cur2).then((res) => {
            blockChainLineGraph(cur2, 2, res);
          });
        });
      }
    });
    $("#pricingData").click(pricingDataClick);
    $("#miningData").click(miningDataClick);
    $("#socialData").click(socialDataClick);
  }
});

//getHistoricalData("BTC", "USD");
