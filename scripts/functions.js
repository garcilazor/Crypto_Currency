let marketCapLoaded = false;
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
      if (marketCapLoaded == false) {
        marketCap(topTenData);
        marketCapLoaded = true;
      }
      if (coinSymbol === null) {
        coinSymbol = topTenData[0].coinSymbol;
        $("#home_title").text("Currency data for: " + coinSymbol);
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
    $("#dailyChangePct" + (i + 1)).text(pricingData[i].dayChangePct);
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

function miningDataClick() {
  if ($("#miningData").attr("aria-expanded") === "true") {
    // if ($("#miningData").attr("aria-expanded") === "true") {
    let className = $("#pricingData").attr("class") + " collapsed";
    $("#pricingData").attr("class", className);
    $("#pricingData").attr("aria-expanded", "false");
    $(".multiPricing").attr("class", "collapse multiPricing");
    className = $("#socialData").attr("class") + " collapsed";
    $("#socialData").attr("class", className);
    $("#socialData").attr("aria-expanded", "false");
    $(".multiSocial").attr("class", "collapse multiSocial");
  }
}

function socialDataClick() {
  if ($("#socialData").attr("aria-expanded") === "true") {
    // if ($("#miningData").attr("aria-expanded") === "true") {
    let className = $("#pricingData").attr("class") + " collapsed";
    $("#pricingData").attr("class", className);
    $("#pricingData").attr("aria-expanded", "false");
    $(".multiPricing").attr("class", "collapse multiPricing");

    className = $("#miningData").attr("class") + " collapsed";
    $("#miningData").attr("class", className);
    $("#miningData").attr("aria-expanded", "false");
    $(".multiMining").attr("class", "collapse multiMining");
  }
}

function pricingDataClick() {
  if ($("#pricingData").attr("aria-expanded") === "true") {
    // if ($("#miningData").attr("aria-expanded") === "true") {
    let className = $("#miningData").attr("class") + " collapsed";
    $("#miningData").attr("class", className);
    $("#miningData").attr("aria-expanded", "false");
    $(".multiMining").attr("class", "collapse multiMining");
    className = $("#socialData").attr("class") + " collapsed";
    $("#socialData").attr("class", className);
    $("#socialData").attr("aria-expanded", "false");
    $(".multiSocial").attr("class", "collapse multiSocial");
  }
}
