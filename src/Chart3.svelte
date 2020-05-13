<script>
  import { onMount } from "svelte";

  export let value = [];

  // Load google charts
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  // Draw the chart and set the chart values
  function drawChart() {
    var data = google.visualization.arrayToDataTable(value);

    var options = {
      legend: "none",
      hAxis: { title: "New Case" },
      vAxis: { title: "Total Case" },
      trendlines: {
        0: {
          type: "polynomial",
          degree: 3,
          visibleInLegend: true
        }
      }
    };

    var chart = new google.visualization.ScatterChart(
      document.getElementById("chart_div")
    );

    chart.draw(data, options);
  }
</script>

<div id="chart_div" />
