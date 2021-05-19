async function getCurrencyCode() {
  let url = 'https://json.geoiplookup.io/';
  let data = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
  console.log(data.currency_code);
  return data.currency_code;
  }
  
  async function getHistoricalData(coinSymbol, currencyCode) {
    const userChoice = document.getElementById("#time_period");
    let limit = 0;
    let url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coinSymbol}&tsym=${currencyCode}`;
    if(userChoice === "month"){
        limit = 30;
        url += `&limit=${limit}&days=30`;
    }
    else if(userChoice === "week"){
        limit = 7;
        url += `&limit=${limit}&days=7`;
    }
    else {
        limit = 24;
        url = `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${coinSymbol}&tsym=${currencyCode}&limit=${limit}`;
    }

    let data = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data.Data);
        return(data.Data);
    })
    .catch((error) => console.log(error));
  
  }

  //getHistoricalData("BTC", "USD");