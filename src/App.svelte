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

  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    console.log("--> dark");
    window.document.documentElement.classList.add("dark");
    console.log(document.documentElement.classList);
  } else {
    console.log("--> light");
    window.document.documentElement.classList.remove("dark");
    console.log(document.documentElement.classList);
  }
</script>

<div class="h-screen flex flex-col">
  <Navbar />
  <Router {routes} />
</div>
