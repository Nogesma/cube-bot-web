<script lang="ts">
  import "./app.css";

  import Router, { push } from "svelte-spa-router";
  import routes from "./routes";
  import Navbar from "./lib/Navbar.svelte";

  if (new URLSearchParams(window.location.search).has("code"))
    push("/auth/oauth2callback" + window.location.search);

  let login = false;

  const handleLogin = (event) => (login = event.detail.login);
</script>

<Navbar {login} />

<Router {routes} on:routeEvent={handleLogin} />
