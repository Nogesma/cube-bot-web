<script lang="ts">
  import "../cubing-icons.css";
  import { push } from "svelte-spa-router";
  import { events } from "../data/config.js";
  import axios from "axios";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const ping = async () => {
    await axios
      .get("http://localhost:3000/api/ping", {
        withCredentials: true,
      })
      .then(() => dispatch("routeEvent", { login: true }))
      .catch(() => {
        dispatch("login", { login: false });
        push("/auth/login");
      });
  };

  onMount(() => ping());
</script>

<div
  class="flex flex-row flex-wrap justify-around content-evenly container mx-auto"
>
  {#each events as e}
    <div
      class="card w-96 bg-base-100 shadow-xl m-5 hover:drop-shadow-lg"
      on:click={() => push(`/timer/${e}`)}
    >
      <figure>
        <span class="cubing-icon cubing-icon-5x event-{e}" />
      </figure>
      <div class="card-body">
        <h2 class="card-title justify-center">{e}</h2>
      </div>
    </div>
  {/each}
</div>
