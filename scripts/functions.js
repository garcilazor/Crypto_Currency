$(document).ready(function () {
  getNewArticles();
  getTopTenVolume("USD").then(function (topTenData) {
    topTenData.sort((a, b) => (a.coinPrice > b.coinPrice ? -1 : 1));
    $(topTenData).each(function (index, value) {
      if (index < 1) {
        let coinPriceContainer = $("<div></div>").text(value.coinPrice);
        $("#price_col_main").append(coinPriceContainer);
      } else if (index < 4) {
        let coinPriceContainer = $("<div></div>").text(value.coinPrice);
        $("#price_col_two").append(coinPriceContainer);
      } else if (index < 7) {
        let coinPriceContainer = $("<div></div>").text(value.coinPrice);
        $("#price_col_three").append(coinPriceContainer);
      } else {
        let coinPriceContainer = $("<div></div>").text(value.coinPrice);
        $("#price_col_four").append(coinPriceContainer);
      }
    });
  });
  $(".articles > div:gt(0)").hide();

  setInterval(function () {
    $(".articles > div:first")
      .fadeOut(1000)
      .next()
      .fadeIn(1000)
      .end()
      .appendTo(".articles");
  }, 3000);
});

//getHistoricalData("BTC", "USD");
