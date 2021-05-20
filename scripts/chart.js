/*new Chart(document.getElementById("pie-chart"), {
  type: "pie",
  data: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: [
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#e8c3b9",
          "#c45850",
        ],
        data: [2478, 5267, 734, 784, 433],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Predicted world population (millions) in 2050",
    },
  },
});
*/
function marketCap(topTen) {
  var options = {
    title: {
      text: "Market Cap",
    },
    data: [
      {
        type: "pie",
        startAngle: 45,
        showInLegend: "true",
        legendText: "{label}",
        indexLabel: "{label} ({y})",
        yValueFormatString: "#,##0.#" % "",
        dataPoints: [
          { label: topTen[0].coinName, y: topTen[0].marketCap },
          { label: topTen[1].coinName, y: topTen[1].marketCap },
          { label: topTen[2].coinName, y: topTen[2].marketCap },
          { label: topTen[3].coinName, y: topTen[3].marketCap },
          { label: topTen[4].coinName, y: topTen[4].marketCap },
          { label: topTen[5].coinName, y: topTen[5].marketCap },
          { label: topTen[6].coinName, y: topTen[6].marketCap },
          { label: topTen[7].coinName, y: topTen[7].marketCap },
          { label: topTen[8].coinName, y: topTen[8].marketCap },
          { label: topTen[9].coinName, y: topTen[9].marketCap },
        ],
      },
    ],
  };
  $(".marketCap").CanvasJSChart(options);
}
