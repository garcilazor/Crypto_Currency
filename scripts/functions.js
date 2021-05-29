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
  for (let i = 0; i < miningObj.length; i++) {
    $("#launchDate" + (i + 1)).text(miningObj[i].launchDate);
    $("#blockNumber" + (i + 1)).text(miningObj[i].blockNumber);
    $("#blockReward" + (i + 1)).text(miningObj[i].blockReward);
    $("#blockTime" + (i + 1)).text(miningObj[i].blockTime);
    $("#maxSupply" + (i + 1)).text(miningObj[i].maxSupply);
    $("#totalCoins" + (i + 1)).text(miningObj[i].totalCoinsMined);
  }
}

function populateSocialMediaTable(socialData, i) {
  $("#fbLikes" + i).text(socialData.Facebook.likes);
  $("#twitStat" + i).text(socialData.Twitter.statuses);
  $("#twitFol" + i).text(socialData.Twitter.followers);
  $("#redditPost" + i).text(socialData.Reddit.posts_per_day);
  $("#repoStars" + i).text(socialData.CodeRepository.List[0].stars);
  $("#forumView" + i).text(socialData.CryptoCompare.PageViewsSplit.Forum);
}
