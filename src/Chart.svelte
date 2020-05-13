<script>
  import { onMount } from "svelte";

  export let value = [];
  
  // Load google charts
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  // Draw the chart and set the chart values
  function drawChart() {
    var data = google.visualization.arrayToDataTable(value);

    // Optional; add a title and set the width and height of the chart
    var options = { width: 600, height: 400, bar: { groupWidth: "95%" } };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.LineChart(
      document.getElementById("barchart")
    );
    chart.draw(data, options);
  }
</script>

<div class="row">
  <div class="col-sm">col col</div>
  <div class="col-sm">
    <div id="barchart" />
  </div>
</div>
