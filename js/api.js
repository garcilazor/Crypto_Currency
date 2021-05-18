const axios = require("axios");
require("dotenv").config();

const CRYPTOCOMPAREAPI = process.env.CRYPTOCOMPAREAPI;

// Get the CoinID from crytocompare based on the name or symbol
// An attempt to find the matching coing Asynchronously
// Needed for certain enpoints of the API
// TODO: May be more effcient to save the coin, name, symbol to file
//  Or find a way to async search repsonse and end early on success
async function fetchCryptoCoinId(coinName, coinSymbol) {
  let res = "";
  try {
    const response = await axios.get(
      `https://min-api.cryptocompare.com/data/all/coinlist?summary=true&api_key=${CRYPTOCOMPAREAPI}`
    );

    await Promise.all(
      Object.values(response.data.Data).map(async (entry) => {
        if (
          entry.Symbol === `${coinSymbol.toUpperCase()}` ||
          entry.FullName.toUpperCase().match(
            "\\b" + coinName.toUpperCase() + "\\b" !== -1
          )
        ) {
          res = entry.Id;
        }
      })
    );
    return res;
  } catch (err) {
    console.error(err);
  }
}

// Data from Cryptonator, must use the coin codes outlined here: https://www.cryptonator.com/api/currencies
// Converts to value type of currency in targetCurrency
async function getCoinDataToTargetCurrency(currencyCode, targetCurrency) {
  try {
    let response = await axios.get(
      `https://api.cryptonator.com/api/full/${currencyCode}-${targetCurrency}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

// get social media presence of coin by either coin's name or coin symbol
// Requires 2 API calls unfortunately, since one needs the coinId integer to use the social media endpoint of API
async function getCoinSocialMediaActivity(coinName, coinSymbol) {
  try {
    let coinId = await fetchCryptoCoinId(coinName, coinSymbol);
    let response = await axios.get(
      `https://min-api.cryptocompare.com/data/social/coin/latest?coinId=${coinId}&api_key=${CRYPTOCOMPAREAPI}`
    );
    //   console.log("CryptoCompare Social Media Response\n", response.data);
    return response.data.Data;
  } catch (err) {
    console.log(err);
  }
}

getCoinSocialMediaActivity("bitcoin", "btc").then((res) => console.log(res));

getCoinDataToTargetCurrency("btc", "usd").then((res) => console.log(res));
