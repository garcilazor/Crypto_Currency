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
  $("#marketCap").replaceWith('<canvas id="marketCap"></canvas>');
  var ctx = document.getElementById("marketCap");
  var myChart = new Chart(ctx, {
    type: "doughnut",
    data: data,
    options: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Market Cap",
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
  $("#blocksMined").replaceWith('<canvas id="blocksMined"></canvas>');
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
  $("#day_graph").replaceWith('<canvas id="day_graph"></canvas>');
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
  $("#week_graph").replaceWith('<canvas id="week_graph"></canvas>');
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
  $("#month_graph").replaceWith('<canvas id="month_graph"></canvas>');
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
  // console.log(chartData.currency1.data);
  const data1 = {
    labels: chartData.labels,
    datasets: [
      {
        label: chartData.currency1.symbol,
        borderColor: "red",
        backgroundColor: "red",
        data: chartData.currency1.data,
      },
    ],
  };
  var canvas = document.getElementById("graph_currency_one");
  let ctx = canvas.getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: data1,
    options: {
      responsive: true,
      legend: {
        position: "top",
      },
    },
  });
  const data2 = {
    labels: chartData.labels,
    datasets: [
      {
        label: chartData.currency2.symbol,
        borderColor: "blue",
        backgroundColor: "blue",
        data: chartData.currency2.data,
      },
    ],
  };

  var canvas1 = document.getElementById("graph_currency_two");
  let ctx1 = canvas1.getContext("2d");
  var myChart = new Chart(ctx1, {
    type: "bar",
    data: data2,
    options: {
      responsive: true,
      legend: {
        position: "top",
      },
    },
  });
}

function InfluencerRadarGraph(influencerData) {
  //console.log(influencerData);
  let names1 = [];
  let engagement1 = [];
  let names2 = [];
  let engagement2 = [];
  // console.log(influencerData);
  influencerData.coin1.data.map((entry) => {
    names1.push(entry.display_name);
    engagement1.push(entry.engagement);
  });
  influencerData.coin2.data.map((entry) => {
    names2.push(entry.display_name);
    engagement2.push(entry.engagement);
  });
  // console.log(names);
  const data1 = {
    labels: names1,
    datasets: [
      {
        label: `${influencerData.coin1.config.symbol}`,
        data: engagement1,
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };
  const data2 = {
    labels: names2,
    datasets: [
      {
        label: `${influencerData.coin2.config.symbol}`,
        data: engagement2,
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };
  $("#influencer_graph1").replaceWith(
    '<canvas id="influencer_graph1"></canvas>'
  );
  var ctx = document.getElementById("influencer_graph1");
  var myChart = new Chart(ctx, {
    type: "radar",
    data: data1,
    options: {
      legend: {
        position: "top",
      },
    },
  });
  $("#influencer_graph2").replaceWith(
    '<canvas id="influencer_graph2"></canvas>'
  );
  var ctx = document.getElementById("influencer_graph2");
  var myChart = new Chart(ctx, {
    type: "radar",
    data: data2,
    options: {
      legend: {
        position: "top",
      },
    },
  });
}
