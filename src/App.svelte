<script>
  import Navbar from "./Navbar.svelte";
  import { onMount } from "svelte";

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
    console.log(data.Countries[77].TotalRecovered);
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

  .col-sm-3 {
    background-color: #cff4fa;
    border: 2px;
    border-radius: 10px;
  }
</style>

<main>
  <Navbar />
  <div class="row">
    <div class="col-sm-3">
      <p class="lead text-center pt-3">Global Summary</p>
      <div class="container">
        <div class="info">
          <div class="numberCircle" style="background-color: #56f068;">
            <span class="lead" data-toggle="counter-up">
              {new_recover.toLocaleString()}
            </span>
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
    <div class="col-sm-8">col-sm-4</div>
  </div>

</main>
