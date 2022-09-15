<script lang="ts">
  import "./app.css";

  import Router, { push } from "svelte-spa-router";
  import routes from "./routes";
  import Navbar from "./lib/Navbar.svelte";
  import { login } from "./stores/settings";
  import axios from "axios";
  import { onMount } from "svelte";

  const authenticate = () =>
    axios
      .get(`${import.meta.env.VITE_BACKEND_URI}/api/ping`, {
        withCredentials: true,
      })
      .then(() => ($login = true))
      .catch(() => {
        $login = false;
        push("/auth/login");
      });

  if (new URLSearchParams(window.location.search).has("code"))
    push("/auth/oauth2callback" + window.location.search);
  else onMount(authenticate);
</script>

<div class="h-screen flex flex-col">
  <Navbar />
  <Router {routes} />
</div>
