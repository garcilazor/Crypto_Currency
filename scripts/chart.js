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
function marketCap() {
  var options = {
    title: {
      text: "Website Traffic Source",
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
          { label: "Organic", y: 36 },
          { label: "Email Marketing", y: 31 },
          { label: "Referrals", y: 7 },
          { label: "Twitter", y: 7 },
          { label: "Facebook", y: 6 },
          { label: "Google", y: 10 },
          { label: "Others", y: 3 },
        ],
      },
    ],
  };
  $(".marketCap").CanvasJSChart(options);
}
