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

function populatePricingTables(pricingData) {
  for (let i = 0; i < pricingData.length; i++) {
    console.log(pricingData[i]);
    //general info pricing tables
    $("#price" + (i + 1)).text(pricingData[i].price);
    $("#dailyChange" + (i + 1)).text(pricingData[i].dayChange);
    $("#dailyChangePct" + (i + 1)).text(pricingData[i].dayChange);
    $("#marketCap" + (i + 1)).text(pricingData[i].mktCap);
    $("#volume" + (i + 1)).text(pricingData[i].volume);
    $("#supply" + (i + 1)).text(pricingData[i].supply);
    //24hourtable
    $("#24hourChange" + (i + 1)).text(pricingData[i]["24hourChange"]);
    $("#24hourChangePct" + (i + 1)).text(pricingData[i]["24hourChangePct"]);
    $("#24hourHigh" + (i + 1)).text(pricingData[i]["24hourHigh"]);
    $("#24hourLow" + (i + 1)).text(pricingData[i]["24hourLow"]);
    $("#24hourVolume" + (i + 1)).text(pricingData[i]["24hourVolume"]);
    $("#24hourTotal" + (i + 1)).text(pricingData[i]["24hourVolumeTO"]);
    //hourly table
    $("#hourlyChange" + (i + 1)).text(pricingData[i]["hourChange"]);
    $("#hourlyChangePct" + (i + 1)).text(pricingData[i]["hourChangePct"]);
    $("#hourlyHigh" + (i + 1)).text(pricingData[i]["hourHigh"]);
    $("#hourlyLow" + (i + 1)).text(pricingData[i]["hourLow"]);
    $("#hourlyVolume" + (i + 1)).text(pricingData[i]["hourVolume"]);
    $("#hourlyVolumeTotal" + (i + 1)).text(pricingData[i]["hourVolumeTO"]);
  }
}

function constructMiningEquipmentObject(data) {
  let sortedData = sortByHashesPerSecond(data);
  let objectArray = [];
  for (let i = 0; i < 10; i++) {
    let constructedObj = {
      name: sortedData[i].Name,
      cost: sortedData[i].Cost,
      powerConsumption: sortedData[i].PowerConsumption,
      hashesPerSecond: sortedData[i].HashesPerSecond,
    };
    objectArray.push(constructedObj);
  }
  console.log("sorted constructed data", objectArray);
}

function sortByHashesPerSecond(data) {
  let sortable = Object.values(data.Data);
  sortable.sort((a, b) =>
    parseInt(a.HashesPerSecond) > parseInt(b.HashesPerSecond) ? -1 : 1
  );
  return sortable;
}

function constructWordCloud(coin) {
  $(
    `<iframe src="https://lunarcrush.com/widgets/wordcloud?symbol=${coin}&interval=1&key=6axkozlibjegqwgg6bmi Week&animation=false&theme=dark" id="wordcloud" frameBorder="0" border="0" cellspacing="0" scrolling="no" style="width: 100%; height: 300px;"></iframe>`
  ).appendTo("#wordCloud");
}
