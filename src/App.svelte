<script>
  import Profile from "./Profile.svelte";
  import Todos from "./Todos.svelte";
  import Login from "./Login.svelte";

  import { auth } from "./firebase";
  import { authState } from "rxfire/auth";

  let user;

  const unsubscribe = authState(auth).subscribe(u => (user = u));
</script>

<style>

</style>

<main>
  {#if user}
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="https://github.com/AWRamadhan/">
        <img
          src={user.photoURL}
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt="" />
        Hi {user.displayName}
      </a>
      <form class="form-inline">
        <button
          class="btn btn-outline-success my-2 my-sm-0"
          on:click={() => auth.signOut()}>
          Logout
        </button>
      </form>
    </nav>
    <Todos uid={user.uid} />
  {:else}
    <div>
      <Login />
    </div>
  {/if}
</main>
