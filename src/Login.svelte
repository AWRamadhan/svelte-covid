<script>
  import { auth, googleProvider } from "./firebase";

  function login() {
    auth.signInWithPopup(googleProvider);
  }
</script>

<div class="container h-100">
  <div class="row align-items-center h-100">
    <div class="col-6 mx-auto">
      <div class="jumbotron">
        <h3>Login</h3>
        <button class="btn btn-primary" on:click={login}>
          Signin with Google
        </button>
      </div>
    </div>
  </div>
</div>
