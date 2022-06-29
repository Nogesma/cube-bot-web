<script lang="ts">
  import "../cubing-icons.css";
  import { push } from "svelte-spa-router";
  import { events } from "../data/config.js";
  import axios from "axios";
  import { onMount } from "svelte";
  import Loading from "../lib/Loading.svelte";
  import { login } from "../stores/settings";

  const ping = async () => {
    await axios
      .get("/api/ping", {
        withCredentials: true,
      })
      .then(() => ($login = true))
      .catch(() => {
        $login = false;
        push("/auth/login");
      });
  };

  onMount(ping);
</script>

{#if !$login}
  <Loading />
{:else}
  <div
    class="flex flex-row flex-wrap justify-around content-evenly container mx-auto"
  >
    {#each events as e}
      <div
        class="card w-96 bg-base-200 shadow-xl m-5 hover:drop-shadow-lg"
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
{/if}
