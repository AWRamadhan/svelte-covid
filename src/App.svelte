<script>
  import Navbar from "./Navbar.svelte";
  import { onMount } from "svelte";

  let data = [];
  let new_case = 0;
  let total_recover = 0;
  let total_death = 0;
  let i = 0;
  let value = [];
  let data_compare = [];
  let today_sembuh = 0;
  let today_die = 0;
  let persentase;
  let day = 0;
  let all_case = 0;
  let today_date = 0;
  let data_ioghar = [];

  onMount(async () => {
    const res = await fetch(`https://indonesia-covid-19.mathdro.id/api/harian`);
    data = await res.json();

    let length = 0;
    if (data.data[data.data.length - 1].jumlahKasusKumulatif == null) {
      length = data.data.length - 1;
    } else {
      length = data.data.length;
    }

    value.push(["Day", "Positif", "Selesai"]);
    for (i = 0; i < length; i++) {
      let hold = [];
      hold.push(i.toString());
      hold.push(data.data[i].jumlahKasusKumulatif);
      hold.push(
        data.data[i].jumlahPasienSembuh + data.data[i].jumlahPasienMeninggal
      );
      value.push(hold);
      total_recover = data.data[length - 1].jumlahPasienSembuh;
      total_death = data.data[length - 1].jumlahPasienMeninggal;
      new_case = data.data[i].jumlahKasusBaruperHari;
      all_case = data.data[length - 1].jumlahKasusKumulatif;
      today_date = data.data[length - 1].tanggal;
    }

    data_compare.push(["Day", "Sembuh", "Meninggal"]);
    for (i = 0; i < length; i++) {
      let hold1 = [];
      hold1.push(i.toString());
      hold1.push(data.data[i].jumlahKasusSembuhperHari);
      hold1.push(data.data[i].jumlahKasusMeninggalperHari);
      data_compare.push(hold1);

      today_sembuh = data.data[i].jumlahKasusSembuhperHari;
      today_die = data.data[i].jumlahKasusMeninggalperHari;
    }

    data_ioghar.push(["New Case", "Total Case"]);
    for (i = 0; i < length; i++) {
      let hold2 = [];
      hold2.push(data.data[i].jumlahKasusKumulatif);
      hold2.push(data.data[i].jumlahKasusBaruperHari);
      data_ioghar.push(hold2);
    }
    persentase = total_recover / (total_recover + total_death);
    persentase = persentase.toFixed(2) * 100;
    day = data_compare.length - 1;

    //---------
    // Load google charts
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);

    // Draw the chart and set the chart values
    function drawChart() {
      var data = google.visualization.arrayToDataTable(value);
      var data2 = google.visualization.arrayToDataTable(data_compare);
      var data3 = google.visualization.arrayToDataTable(data_ioghar);

      // Optional; add a title and set the width and height of the chart
      var options = {
        backgroundColor: "none",
        legend: { position: "bottom" }
      };

      // Display the chart inside the <div> element with id="piechart"
      var chart = new google.visualization.LineChart(
        document.getElementById("barchart")
      );
      chart.draw(data, options);

      var chart = new google.visualization.LineChart(
        document.getElementById("linechart")
      );
      chart.draw(data2, options);

      var options1 = {
        legend: "none",
        backgroundColor: "none",
        hAxis: { title: "Total Case" },
        vAxis: { title: "New Case" },
        trendlines: {
          0: { type: "polynomial", degree: 3, visibleInLegend: true }
        }
      };

      var chart = new google.visualization.ScatterChart(
        document.getElementById("chart_div")
      );

      chart.draw(data3, options1);
    }
  });

</script>

<style>
  .numberCircle {
    display: inline-block;
    line-height: 0px;
    border-radius: 50%;

    font-size: 50px;
  }

  .numberCircle span {
    display: inline-block;

    padding-top: 50%;
    padding-bottom: 50%;

    margin-left: 8px;
    margin-right: 8px;
    color: white;
  }
  .info {
    text-align: center;
    padding: 0.5rem;
  }

  .jumbotron {
    background: none;
  }
</style>

<main>
  <Navbar />
  <div class="row">
    <div class="upt-data jumbotron jumbotron-fluid col-sm-4 p-2">
      <p class="lead text-center">{new Date(today_date)}</p>
      <div class="info new-recover">
        <div class="numberCircle card-text" style="background-color: #2c8cf2;">
          <span class="lead">{new_case.toLocaleString()}</span>
        </div>
      </div>
      <div class="info">
        <div class="numberCircle" style="background-color: #0af745;">
          <span class="lead" data-toggle="counter-up">
            {total_recover.toLocaleString()}
          </span>
        </div>
      </div>
      <div class="info">
        <div class="numberCircle" style="background-color: #de0b20;">
          <span class="lead" data-toggle="counter-up">
            {total_death.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
    <div class="cov-info col-sm-8">
      <div class="jumbotron jumbotron-fluid p-2">
        <h1 class="display-4">COVID 19</h1>
        <p class="lead">
          Coronavirus disease (COVID-19) is an infectious disease caused by a
          newly discovered coronavirus.
        </p>
        <p class="lead">
          Most people infected with the COVID-19 virus will experience mild to
          moderate respiratory illness and recover without requiring special
          treatment. Older people, and those with underlying medical problems
          like cardiovascular disease, diabetes, chronic respiratory disease,
          and cancer are more likely to develop serious illness.
        </p>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm">
      <div class="jumbotron jumbotron-fluid p-2">
        <div class="container">
          <div id="barchart" />
        </div>
      </div>
    </div>
    <div class="col-sm-5">
      <div class="jumbotron jumbotron-fluid p-2">
        <p class="lead">
          In Indonesia there are {all_case.toLocaleString()} people infected with
          COVID-19 with {total_recover.toLocaleString()} recovered from the
          vLineChartirus. There is {(all_case - (total_recover + total_death)).toLocaleString()}
          people still in in care, that's mean {(((all_case - (total_recover + total_death)) / all_case) * 100).toFixed()}%
          of the patient still in care where mortality rate is in {((total_death / all_case) * 1000).toFixed() / 10}%
          compared to seasonal flu arround 2%. With mortality rate in {((total_death / all_case) * 1000).toFixed() / 10}%
          we can calculate that arround {(
            (total_death / all_case) *
            (all_case - (total_recover + total_death))
          )
            .toFixed()
            .toLocaleString()} patient in care will not survive againts this
          virus.
        </p>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm">
      <div class="jumbotron jumbotron-fluid p-2">
        <div class="container">
          <div id="linechart" />
        </div>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="jumbotron jumbotron-fluid p-2">
        <p class="lead">
          From the data from the past {day} days we know that today we have {new_case}
          while {today_sembuh} people recover and {today_die} people died from
          the virus. With the percentage of people recovering {persentase}% and {100 - persentase}%
          people did not recover.
        </p>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm">
      <div class="jumbotron jumbotron-fluid p-2">
        <div class="container">
          <div id="chart_div" />
        </div>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="jumbotron jumbotron-fluid p-2">
        <p class="lead">
          Total Case vs New Case is a way to see the exponential growth of the
          COVID-19 case. With this you can see that Indonesia case is still
          growing.
        </p>
      </div>
    </div>
  </div>
</main>
