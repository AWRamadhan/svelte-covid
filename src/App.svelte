<script>
  import Navbar from "./Navbar.svelte";
  import { onMount } from "svelte";
  import Chart from "./Chart.svelte";

  let data = [];
  let new_recover = 0;
  let total_recover = 0;
  let new_death = 0;
  let total_death = 0;

  onMount(async () => {
    const res = await fetch(`https://api.covid19api.com/summary`);
    data = await res.json();
    new_death = data.Global.NewDeaths;
    new_recover = data.Global.NewRecovered;
    total_recover = data.Global.TotalRecovered;
    total_death = data.Global.TotalDeaths;
  });
</script>

<style>
  .row {
    background-image: url("/remote-work-man.svg");
    background-attachment: fixed;
    background-size: cover;
  }
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

  .col-sm-4 {
    border: 2px;
    border-radius: 10px;
  }
</style>

<main>
  <Navbar />
  <div class="row">
    <div class=" jumbotron jumbotron-fluid col-sm-4" style="background: none;">
      <div class="container">
        <div class="info new-recover">
          <div
            class="numberCircle card-text"
            style="background-color: #56f068;">
            <span class="lead">{new_recover.toLocaleString()}</span>
          </div>
        </div>
        <div class="info">
          <div class="numberCircle" style="background-color: #e6204b;">
            <span class="lead" data-toggle="counter-up">
              {new_death.toLocaleString()}
            </span>
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
    </div>
    <div class="col-sm-8">
      <div class="jumbotron jumbotron-fluid" style="background: none">
        <div class="container">
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
  </div>
  <div class="row">
    <div class="col-sm"><Chart /></div>
    <div class="col-sm">col-sm</div>
  </div>
</main>
