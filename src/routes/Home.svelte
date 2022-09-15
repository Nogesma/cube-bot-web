<script lang="ts">
  import "../cubing-icons.css";
  import { push } from "svelte-spa-router";
  import { events } from "../data/config.js";
</script>

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
