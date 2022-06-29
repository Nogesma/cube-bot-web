<script lang="ts">
  import "./app.css";

  import Router, { push } from "svelte-spa-router";
  import routes from "./routes";
  import Navbar from "./lib/Navbar.svelte";
  import { login } from "./stores/settings";
  import { location } from "svelte-spa-router";
  import axios from "axios";

  if (new URLSearchParams(window.location.search).has("code"))
    push("/auth/oauth2callback" + window.location.search);

  if (!$login && $location !== "/")
    axios
      .get(`${import.meta.env.VITE_BACKEND_URI}/api/ping`, {
        withCredentials: true,
      })
      .then(() => ($login = true))
      .catch(() => {
        $login = false;
        push("/auth/login");
      });
</script>

<Navbar />

<Router {routes} />
