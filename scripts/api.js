const CRYPTOCOMPAREAPI =
  "884dab4e1acc11768097bbbb4e11b0a0e04e167297aa7d11437fa5922e4b5e51";

const LUNARCRUSHAPI = "6axkozlibjegqwgg6bmi";

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
// Retrieves the top 10 crypto currencies based on volume and saves other useful data
// surrounding the coin to be returned as a formatted list of objects with better property names.
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
// in a particular currency based on the currency code that was fetch and passed in
//along with the speicification for what is needed in terms of day, week, month
async function getHistoricalData(coinSymbol, currencyCode, choice) {
  // console.log(coinSymbol, currencyCode, choice);
  let times = [];
  let closingPrices = [];
  let allData = {};

  let limit = 0;
  //formatting the url for the specific request
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
      //gets the needed values for the article information
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
      //populated the article carosuel
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

// Gets the blockchain data for the coin passed in as targetCurrency
// Creates a custom object array and converts the unix epoch timestamp retrieved into a readable
// date to be displayed later in the chart rendering function.
// Time array is used as the array of labels for chartjs.
async function HistoricalDailyBlockChain(targetCurrency) {
  let url = `https://min-api.cryptocompare.com/data/blockchain/histo/day?fsym=${targetCurrency}&api_key=${CRYPTOCOMPAREAPI}`;
  let time = [];
  let rawData = [];
  let transactionCount = [];
  let currentSupply = [];
  let blockSize = [];
  let finalData = {};
  let hashRate = [];
  let blockTime = [];
  let avgTransactionValue = [];
  let data = await fetch(url)
    .then((response) => response.json())
    .then((res) => {
      Object.values(res.Data.Data).map((entry) => {
        // Convert unix epoch time to human-readable format
        let d = new Date(0);
        d.setUTCSeconds(entry.time);
        time.push(d.toLocaleString().split(",", 1));

        rawData.push(entry);
        blockSize.push(entry.block_size);
        transactionCount.push(entry.transaction_count);
        currentSupply.push(entry.current_supply);
        hashRate.push(entry.hashrate);
        blockTime.push(entry.block_time);
        avgTransactionValue.push(entry.average_transaction_value);
      });
      finalData.time = time;
      finalData.data = rawData;
      finalData.transactionCount = transactionCount;
      finalData.currentSupply = currentSupply;
      finalData.blockSize = blockSize;
      finalData.hashRate = hashRate;
      finalData.blockTime = blockTime;
      finalData.avgTransactionValue = avgTransactionValue;
      return finalData;
    })
    .catch((error) => console.log(error));
  return data;
}

// Retrives 24-hour price data of the 2 currencies passed in and converts it in terms of
// the local currency provided.
// also creates a label array to be used by the chartjs function that renders the related graph.
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

// a function to intialize a mining object from a data object
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

//A function that retrieves mining related data from the two
//currencies that are passed into the function for comparsion
//this data will then be used to poulate the mining data table
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

// Retrieves full pricing data of 2 dfferent cryptocurrency symbols [curr1, curr2]
// localCurrency is the desired local currency to convert the values too.
// Once the data is retrieved a custom list of objects are constructed to be used by other
// functions in the app.
async function getPricingInfo(curr1, curr2, localCurrency) {
  let url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${curr1},${curr2}&tsyms=${localCurrency}`;
  let dataArr = [];
  let labels = ["general", "24hour", "hour"];
  let data = await fetch(url)
    .then((response) => response.json())
    .then((pricingData) => {
      console.log(pricingData);
      Object.values(pricingData.DISPLAY[curr1]).map((entry) => {
        currency1 = {
          //pricing table
          mktCap: entry.MKTCAP,
          price: entry.PRICE,
          supply: entry.SUPPLY,
          dayChange: entry.CHANGEDAY,
          dayChangePct: entry.CHANGEPCTDAY,
          volume: entry.VOLUMEDAY,

          //24hour table
          "24hourChange": entry.CHANGE24HOUR,
          "24hourChangePct": entry.CHANGEPCT24HOUR,
          "24hourHigh": entry.HIGH24HOUR,
          "24hourLow": entry.LOW24HOUR,
          "24hourVolume": entry.VOLUME24HOUR,
          "24hourVolumeTO": entry.VOLUME24HOURTO,

          //hourly table
          hourChange: entry.CHANGEHOUR,
          hourChangePct: entry.CHANGEPCTHOUR,
          hourHigh: entry.HIGHHOUR,
          hourLow: entry.LOWHOUR,
          hourVolume: entry.VOLUMEHOUR,
          hourVolumeTO: entry.VOLUMEHOURTO,
        };
      });

      Object.values(pricingData.DISPLAY[curr2]).map((entry) => {
        currency2 = {
          //pricing table
          mktCap: entry.MKTCAP,
          price: entry.PRICE,
          supply: entry.SUPPLY,
          dayChange: entry.CHANGEDAY,
          dayChangePct: entry.CHANGEPCTDAY,
          volume: entry.VOLUMEDAY,

          //24hour table
          "24hourChange": entry.CHANGE24HOUR,
          "24hourChangePct": entry.CHANGEPCT24HOUR,
          "24hourHigh": entry.HIGH24HOUR,
          "24hourLow": entry.LOW24HOUR,
          "24hourVolume": entry.VOLUME24HOUR,
          "24hourVolumeTO": entry.VOLUME24HOURTO,

          //hourly table
          hourChange: entry.CHANGEHOUR,
          hourChangePct: entry.CHANGEPCTHOUR,
          hourHigh: entry.HIGHHOUR,
          hourLow: entry.LOWHOUR,
          hourVolume: entry.VOLUMEHOUR,
          hourVolumeTO: entry.VOLUMEHOURTO,
        };
        dataArr.push(currency1);
        dataArr.push(currency2);
      });
    })
    .catch((error) => console.log(error));

  return dataArr;
}

// Get most engaged influencers for the 2 coins passed into coin{1,2} arguments
// Engagement is based on number of followers, comments/likes on tweets that have to do with the cryptocurrency
// default is to get the top 10 influencers and aggregate the data from the last 30 days to calculate this top 10
// No gaurantee of what order the coins are retrieved since they are async, so the caller needs to do a check on the returned
// coins symbols to see that data corresponds to which coin.
async function getInfluencerData(coin1, coin2, limit = 10, num_days = 30) {
  urlCoin1 = `https://api.lunarcrush.com/v2?data=influencers&key=${LUNARCRUSHAPI}&num_days=${num_days}&days=7&symbol=${coin1}&limit=${limit}`;
  urlCoin2 = `https://api.lunarcrush.com/v2?data=influencers&key=${LUNARCRUSHAPI}&num_days=${num_days}&days=7&symbol=${coin2}&limit=${limit}`;
  let data = {};

  data.coin1 = await fetch(urlCoin1)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
  data.coin2 = await fetch(urlCoin2)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));

  return data;
}

async function getMiningEquipment() {
  url = `https://min-api.cryptocompare.com/data/mining/equipment/general?api_key=${CRYPTOCOMPAREAPI}`;

  let data = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));

  console.log(data);
  constructMiningEquipmentObject(data);

  return data;
}
