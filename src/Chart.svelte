<script>
  import { onMount } from "svelte";

  export let data = [1,2,3,4];

  function chart() {
    var ctx = document.getElementById("myChart");
    var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options  
      });
  }
  onMount(chart);
</script>

<canvas id="myChart" width="200" height="200" />
