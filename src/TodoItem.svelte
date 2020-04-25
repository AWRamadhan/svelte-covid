<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function remove() {
    dispatch("remove", { id });
  }

  function toggleStatus() {
    let newStatus = !complete;
    dispatch("toggle", {
      id,
      newStatus
    });
  }

  export let id;
  export let text;
  export let complete;
</script>

<style>
  .is-complete {
    text-decoration: line-through;
    color: green;
  }
</style>

<li class="list-group-item">
  {#if complete}
    <span class="is-complete">{text}</span>
    <button on:click={toggleStatus}>Undo</button>
  {:else}
    <span>{text}</span>
    <button on:click={toggleStatus}>Done</button>
  {/if}

  <button on:click={remove}>Delete</button>

</li>
