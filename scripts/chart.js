function marketCap(topTen) {
  console.log(parseInt(topTen[0].marketCap));
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
        backgroundColor: "rgba(0, 181, 255, 1)",
        borderColor: "red", // The main line color
      },
      {
        label: "Block Size",
        data: input.blockSize,
        fill: false,
        backgroundColor: "rgba(255, 3, 8, 1)",
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
