const CRYPTOCOMPAREAPI =
  "884dab4e1acc11768097bbbb4e11b0a0e04e167297aa7d11437fa5922e4b5e51";

// Get the CoinID from crytocompare based on the name or symbol
// An attempt to find the matching coing Asynchronously
// Needed for certain enpoints of the API
// TODO: May be more effcient to save the coin, name, symbol to file
//  Or find a way to async search repsonse and end early on success
async function fetchCryptoCoinId(coinName, coinSymbol) {
  let res = "";
  let url = `https://min-api.cryptocompare.com/data/all/coinlist?summary=true&api_key=${CRYPTOCOMPAREAPI}`;
  let coinId = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      Object.values(data.Data).map((entry) => {
        if (
          entry.Symbol === `${coinSymbol.toUpperCase()}` ||
          entry.FullName.toUpperCase().match(
            "\\b" + coinName.toUpperCase() + "\\b" !== -1
          )
        ) {
          res = entry.Id;
        }
      });
      return res;
    })
    .catch((error) => console.log(error));
  return coinId;
}

async function getTopTenVolume(localCurrency) {
  let url = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=${localCurrency}&api_key=${CRYPTOCOMPAREAPI}`;
  let topTen = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let topDict = [];
      Object.values(data.Data).map((entry) => {
        topDict.push({
          coinName: entry.CoinInfo.FullName,
          coinSymbol: entry.CoinInfo.Name,
          coinPrice: entry.RAW[localCurrency].PRICE,
          coinVolume: entry.RAW[localCurrency].VOLUMEDAY,
          marketCap: entry.RAW[localCurrency].MKTCAP,
        });
      });
      topDict.forEach((entry, index) => {
        let listItem = document.getElementById(`item${index + 1}`);
        listItem.innerHTML = entry.coinSymbol + " -- " + entry.coinName;
      });
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
async function getCoinSocialMediaActivity(coinName, coinSymbol) {
  let coinId = await fetchCryptoCoinId(coinName, coinSymbol);
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
      return data;
    })
    .catch((error) => console.log(error));
  console.log(data.currency_code);
  return data.currency_code;
}

//fetches the historical of a particular cryptocurrency
// in a particular currency
async function getHistoricalData(coinSymbol, currencyCode) {
  const userChoice = document.getElementById("#time_period");
  let limit = 0;
  let url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coinSymbol}&tsym=${currencyCode}`;
  if (userChoice === "month") {
    limit = 30;
    url += `&limit=${limit}&days=30`;
  } else if (userChoice === "week") {
    limit = 7;
    url += `&limit=${limit}&days=7`;
  } else {
    limit = 24;
    url = `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${coinSymbol}&tsym=${currencyCode}&limit=${limit}`;
  }

  let data = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.Data);
      return data.Data;
    })
    .catch((error) => console.log(error));
}
//fetches the top news articles for on cryptocurrencies
async function getNewArticles() {
  let url = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN`;
  let container = document.querySelector(".carousel-inner");
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
        //let listItem = document.getElementById(`articles`);
        let ele = document.createElement("div");
        if (Boolean(flag)) {
          ele.setAttribute("class", "carousel-item active");
          flag = 0;
        } else {
          ele.setAttribute("class", "carousel-item");
        }
        ele.innerHTML = `<img src=" ${entry.image}" class="d-block w-100" alt="..."><div class="carousel-caption d-none d-md-block">
                         <h5>First slide label</h5>
                         <p>Some representative placeholder content for the first slide.</p>
                         </div>`;
        //"<img class='d-block w-80'  alt='" + index + " slide'>";
        container.append(ele);
      });
      //console.log(articles);
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
