const CRYPTOCOMPAREAPI =
  "884dab4e1acc11768097bbbb4e11b0a0e04e167297aa7d11437fa5922e4b5e51";

// Get the CoinID from crytocompare based on the name or symbol
// An attempt to find the matching coing Asynchronously
// Needed for certain enpoints of the API
// TODO: May be more effcient to save the coin, name, symbol to file
//  Or find a way to async search repsonse and end early on success
async function fetchCryptoCoinId(coinSymbol1, coinSymbol2) {
  let res = {};
  let url = `https://min-api.cryptocompare.com/data/all/coinlist?summary=true&api_key=${CRYPTOCOMPAREAPI}`;
  let coinIds = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      Object.values(data.Data).map((entry) => {
        if (entry.Symbol === `${coinSymbol1}`) {
          res.coinCode1 = entry.Id;
        }
        if (entry.Symbol === `${coinSymbol2}`) {
          res.coinCode2 = entry.Id;
        }
      });
      return res;
    })
    .catch((error) => console.log(error));
  // console.log(coinIds);
  return coinIds;
}
async function getTopTenVolume(localCurrency) {
  let url = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=${localCurrency}&api_key=${CRYPTOCOMPAREAPI}`;
  let topTen = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let topDict = [];
      Object.values(data.Data).map((entry) => {
        topDict.push({
          currencyCode: localCurrency.toString(),
          coinName: entry.CoinInfo.FullName,
          coinSymbol: entry.CoinInfo.Name,
          coinPrice: entry.RAW[localCurrency].PRICE,
          coinVolume: entry.RAW[localCurrency].VOLUMEDAY,
          marketCap: entry.RAW[localCurrency].MKTCAP,
        });
      });
      if ($("body").attr("id") === "home") {
        $("#volume_header").replaceWith(
          "Top Currencies by Volume " + "(" + topDict[0].currencyCode + ")"
        );
        topDict.forEach((entry, index) => {
          let listItem = document.getElementById(`item${index + 1}`);
          listItem.innerHTML =
            "[" + entry.coinSymbol + "]" + " " + entry.coinName;
        });
      }
      return topDict;
    })
    .catch((error) => console.log(error));
  return topTen;
}

// Data from Cryptonator, must use the coin codes outlined here: https://www.cryptonator.com/api/currencies
// Converts to value type of currency in targetCurrency
async function getCoinDataToTargetCurrency(currencyCode, targetCurrency) {
  let url = `https://api.cryptonator.com/api/full/${currencyCode}-${targetCurrency}`;
  let data = await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
  return data;
}

// get social media presence of coin by either coin's name or coin symbol
// Requires 2 API calls unfortunately, since one needs the coinId integer to use the social media endpoint of API
async function getCoinSocialMediaActivity(coinId) {
  let url = `https://min-api.cryptocompare.com/data/social/coin/latest?coinId=${coinId}&api_key=${CRYPTOCOMPAREAPI}`;
  let data = await fetch(url)
    .then((response) => response.json())
    .then((data) => data.Data)
    .catch((error) => console.log(error));
  return data;
}
//get the currency code based on the origins of the ip of
// the user
async function getCurrencyCode() {
  let url = "https://json.geoiplookup.io/";
  let data = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data.currency_code;
    })
    .catch((error) => console.log(error));
  // console.log(data.currency_code);
  return data;
}

//fetches the historical of a particular cryptocurrency
// in a particular currency
async function getHistoricalData(coinSymbol, currencyCode, choice) {
  // console.log(coinSymbol, currencyCode, choice);
  let times = [];
  let closingPrices = [];
  let allData = {};

  let limit = 0;
  let url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coinSymbol}&tsym=${currencyCode}`;
  if (choice === "month") {
    limit = 30;
    url += `&limit=${limit}&days=30`;
  } else if (choice === "week") {
    limit = 7;
    url += `&limit=${limit}&days=7`;
  } else {
    limit = 24;
    url = `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${coinSymbol}&tsym=${currencyCode}&limit=${limit}`;
  }

  let data = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data.Data);
      Object.values(data.Data.Data).map((entry) => {
        let time = new Date(0);
        time.setUTCSeconds(entry.time);
        if (choice === "day") {
          let y = time.toLocaleString().split(",");
          times.push(y[1]);
        } else {
          let y = time.toLocaleString().split(",");
          //console.log(y[0]);
          times.push(y[0]);
        }
        closingPrices.push(entry.close);
      });
      allData.time = times;
      allData.closingPrices = closingPrices;
      // console.log(allData);
      return allData;
    })
    .catch((error) => console.log(error));
  return data;
}
//fetches the top news articles for on cryptocurrencies
async function getNewArticles() {
  let url = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN`;
  let container = document.querySelector(".articles");
  let data = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let articles = [];
      //  console.log(data.Data);
      Object.values(data.Data).map((entry) => {
        articles.push({
          title: entry.title,
          url: entry.url,
          image: entry.imageurl,
          title: entry.title,
          body: entry.body,
        });
      });
      let flag = 1;
      articles.forEach((entry, index) => {
        let ele = document.createElement("div");
        let wordCount = entry.body.split(" ");
        if (wordCount.length > 20) {
          wordCount.length = 20;
          wordCount.push("...");
          entry.body = wordCount.join(" ");
        }
        if (Boolean(flag)) {
          ele.setAttribute("class", "carousel-item active");
          flag = 0;
        } else {
          ele.setAttribute("class", "carousel-item");
        }
        ele.innerHTML = ` <a href="${entry.url}"><img src="https://wholistickids.com/wp-content/uploads/2019/01/plain-black-background.jpg" class="d-block w-100" alt="${entry.title}"><div class="carousel-caption">
                         <h5>${entry.title}</h5>
                         <p>${entry.body}</p>
                         </div></a>`;
        container.append(ele);
      });

      return articles;
    })
    .catch((error) => console.log(error));
}

async function HistoricalDailyBlockChain(targetCurrency) {
  let url = `https://min-api.cryptocompare.com/data/blockchain/histo/day?fsym=${targetCurrency}&api_key=${CRYPTOCOMPAREAPI}`;
  let time = [];
  let rawData = [];
  let transactionCount = [];
  let currentSupply = [];
  let blockSize = [];
  let finalData = {};
  let data = await fetch(url)
    .then((response) => response.json())
    .then((res) => {
      Object.values(res.Data.Data).map((entry) => {
        let d = new Date(0);
        d.setUTCSeconds(entry.time);
        time.push(d.toLocaleString().split(",", 1));
        rawData.push(entry);
        blockSize.push(entry.block_size);
        transactionCount.push(entry.transaction_count);
        currentSupply.push(entry.current_supply);
      });
      finalData.time = time;
      finalData.data = rawData;
      finalData.transactionCount = transactionCount;
      finalData.currentSupply = currentSupply;
      finalData.blockSize = blockSize;
      return finalData;
    })
    .catch((error) => console.log(error));
  return data;
}

async function MutlipleSymbolsFullData(currency1, currency2, localCurrency) {
  let url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${currency1},${currency2}&tsyms=${localCurrency}`;
  let data = await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));

  let parsedData = [];
  parsedData.localCurrency = localCurrency;
  // console.log(data);
  Object.values(data.RAW[currency1]).map((entry) => {
    parsedData.currency1 = {
      symbol: entry.FROMSYMBOL,
      data: [entry.HIGH24HOUR, entry.LOW24HOUR, entry.PRICE],
    };
  });
  Object.values(data.RAW[currency2]).map((entry) => {
    parsedData.currency2 = {
      symbol: entry.FROMSYMBOL,
      data: [entry.HIGH24HOUR, entry.LOW24HOUR, entry.PRICE],
    };
  });
  parsedData.labels = ["24-hour High", "24-hour Low", "Current Price"];
  return parsedData;
}

function intializeMiningObj(currency, data) {
  coinData = data[currency].CoinInfo;
  let miningObj = {
    coinName: coinData.Name,
    launchDate: coinData.AssetLaunchDate,
    blockNumber: coinData.BlockNumber.toLocaleString(),
    blockReward: coinData.BlockReward.toLocaleString(),
    blockTime: coinData.BlockTime.toLocaleString(),
    maxSupply: coinData.NetHashesPerSecond.toLocaleString(),
    totalCoinsMined: coinData.TotalCoinsMined.toLocaleString(),
  };
  return miningObj;
}

async function getMiningData(currency1, currency2, currCode) {
  let url = `https://min-api.cryptocompare.com/data/blockchain/mining/calculator?fsyms=${currency1},${currency2}&tsyms=${currCode}`;
  let coins = [];
  coin1 = {};
  coin2 = {};
  let data = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data.Data);
      //console.log(coinData.AssetLaunchDate);
      coin1 = intializeMiningObj(currency1, data.Data);
      coin2 = intializeMiningObj(currency2, data.Data);
      coins.push(coin1);
      coins.push(coin2);
      //console.log(coins);
      return coins;
    })
    .catch((error) => console.log(error));

  return data;
}

async function pricingInfo(curr1, curr2, localCurrency) {
  let url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${curr1},${curr2}&tsyms=${localCurrency}`;
  let data = await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));

  let dataArr = [];
  console.log(data);

  return dataArr;
}
