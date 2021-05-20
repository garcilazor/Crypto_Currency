$(".articles > div:gt(0)").hide();

setInterval(function () {
  $(".articles > div:first")
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo(".articles");
}, 3000);
//getHistoricalData("BTC", "USD");
