function topTenPrices(topTenData) {
  $("#price_header").append("(").append(topTenData[0].currencyCode).append(")");
  $(topTenData).each(function (index, value) {
    let listItem = document.getElementById(`item${index + 1}-price`);
    listItem.innerHTML = "[" + value.coinSymbol + "] " + value.coinPrice;
  });
}

function priceGraphs() {
  dayPriceGraph(getHistoricalData("BTC", "USD", "day"));
}
