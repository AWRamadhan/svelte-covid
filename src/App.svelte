<script>
import { onMount } from "svelte";

  let data = [];
  value = 0

  onMount(async () => {
    const res = await fetch(`https://api.covid19api.com/summary`);
    data = await res.json();
    value = data.Global.TotalConfirmed.value()
    console.log(data);
  });
</script>

<style>

</style>

<main>
  <h1>{value}</h1>
  <p></p>
</main>
