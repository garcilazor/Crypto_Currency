function topTenPrices(topTenData) {
  $(topTenData).each(function (index, value) {
    let boldSpan = $("<strong></strong>");
    boldSpan.text(index + 1);
    if (index < 1) {
      let coinPriceContainer = $("<div></div>");
      coinPriceContainer.append(boldSpan).append(" - ").append(value.coinPrice);
      $("#price_col_main").append(coinPriceContainer);
    } else if (index < 4) {
      let coinPriceContainer = $("<div></div>");
      coinPriceContainer.append(boldSpan).append(" - ").append(value.coinPrice);
      $("#price_col_two").append(coinPriceContainer);
    } else if (index < 7) {
      let coinPriceContainer = $("<div></div>");
      coinPriceContainer.append(boldSpan).append(" - ").append(value.coinPrice);
      $("#price_col_three").append(coinPriceContainer);
    } else {
      let coinPriceContainer = $("<div></div>");
      coinPriceContainer.append(boldSpan).append(" - ").append(value.coinPrice);
      $("#price_col_four").append(coinPriceContainer);
    }
  });
}
