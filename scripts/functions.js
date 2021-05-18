async function getCurrencyCode() {
  let url = 'https://json.geoiplookup.io/';
  let data = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  console.log(data.currency_code);
  return data.currency_code;
  }
  
  async function getHistoricalData() {
    let userChoice = document.getElementById("#time_period");
    const url = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=30&day=30'
  
    
  
  }