<script>
  export let displayName;
  export let photoURL;
  export let uid;
</script>

<!-- Image and text -->
<nav class="navbar navbar-light bg-light">
  <a class="navbar-brand" href="#">
    <img
      src={photoURL}
      width="30"
      height="30"
      class="d-inline-block align-top"
      alt="" />
    Hi {displayName}
  </a>
</nav>
