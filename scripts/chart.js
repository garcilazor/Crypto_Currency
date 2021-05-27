function marketCap(topTen) {
  // console.log(parseInt(topTen[0].marketCap));
  const data = {
    labels: [
      topTen[0].coinName,
      topTen[1].coinName,
      topTen[2].coinName,
      topTen[3].coinName,
      topTen[4].coinName,
      topTen[5].coinName,
      topTen[6].coinName,
      topTen[7].coinName,
      topTen[8].coinName,
      topTen[9].coinName,
    ],
    datasets: [
      {
        label: "Market Cap",
        data: [
          topTen[0].marketCap,
          topTen[1].marketCap,
          topTen[2].marketCap,
          topTen[3].marketCap,
          topTen[4].marketCap,
          topTen[5].marketCap,
          topTen[6].marketCap,
          topTen[7].marketCap,
          topTen[8].marketCap,
          topTen[9].marketCap,
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "blue",
          "black",
          "white",
          "green",
          "turquoise",
          "teal",
          "light green",
        ],

        hoverOffset: 4,
      },
    ],
  };
  var ctx = document.getElementById("marketCap");
  var myChart = new Chart(ctx, {
    type: "doughnut",
    data: data,
    options: {
      legend: {
        position: "bottom",
      },
      maintainAspectRatio: false,
    },
  });
}

function blockChainLineGraph(CoinName, input) {
  const options = {
    responsive: true,
  };
  const data = {
    labels: input.time,
    datasets: [
      {
        label: "Transaction Count",
        data: input.transactionCount,
        fill: false,
        backgroundColor: "red",
        borderColor: "red", // The main line color
      },
      {
        label: "Block Size",
        data: input.blockSize,
        fill: false,
        backgroundColor: "green",
        borderColor: "green", // The main line color
      },
    ],
  };
  let canvas = document.getElementById("blocksMined");
  let ctx = canvas.getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
}

function dayPriceGraph(dayData) {
  // console.log(dayData);
  const data = {
    labels: dayData.time,
    datasets: [
      {
        label: "24-Hour Prices",
        fill: false,
        data: dayData.closingPrices,
        borderColor: "red",
        backgroundColor: "red",
      },
    ],
  };
  var ctx = document.getElementById("day_graph");
  var myChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      legend: {
        position: "top",
      },
    },
  });
}

function weekPriceGraph(weekData) {
  const data = {
    labels: weekData.time,
    datasets: [
      {
        label: "Weekly Prices",
        fill: false,
        data: weekData.closingPrices,
        borderColor: "green",
        backgroundColor: "green",
      },
    ],
  };
  var ctx = document.getElementById("week_graph");
  var myChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      legend: {
        position: "top",
      },
    },
  });
}

function monthPriceGraph(monthData) {
  //console.log(monthData);
  const data = {
    labels: monthData.time,
    datasets: [
      {
        label: "Monthly Prices",
        fill: false,
        data: monthData.closingPrices,
        borderColor: "black",
        backgroundColor: "black",
      },
    ],
  };
  var ctx = document.getElementById("month_graph");
  var myChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      legend: {
        position: "top",
      },
    },
  });
}

function MultiSymbolFullDataChart(chartData) {
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: chartData.currency1.symbol,
        borderColor: "red",
        backgroundColor: "red",
        data: chartData.currency1.data,
      },
      {
        label: chartData.currency2.symbol,
        borderColor: "blue",
        backgroundColor: "blue",
        data: chartData.currency2.data,
      },
    ],
  };
  var canvas = document.getElementById("multiSymbolFullData");
  let ctx = canvas.getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      legend: {
        position: "top",
      },
    },
  });
}
