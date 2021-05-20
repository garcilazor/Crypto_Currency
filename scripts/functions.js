$(document).ready(function () {
  getNewArticles();
  getTopTenVolume("USD").then(function (topTenData) {
    $(topTenData).each(function (index, value) {
      let coinPriceContainer = $("<div></div>").text(value.coinPrice);
      $("#prices_container").append(coinPriceContainer);
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
