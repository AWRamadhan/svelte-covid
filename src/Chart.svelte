<script>
  import { onMount } from "svelte";

  let data;
  let value = [];
  let day = [];
  let i = 0;

  onMount(async () => {
    const res = await fetch(`https://indonesia-covid-19.mathdro.id/api/harian`);
    data = await res.json();
    for (i = 0; i < data.data.length; i++) {
      day.push(i.toString());
      value.push(data.data[i].jumlahKasusKumulatif);
    }
  });

  console.log(value);
  console.log(day);

  onMount(async () => {});
  function renderChart() {
    var ctx = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 10, 5, 2, 20, 30, 45]
          }
        ]
      },
      options: {}
    });
  }
</script>

<div>
  <canvas id="myChart" width="200" height="200" />
</div>
