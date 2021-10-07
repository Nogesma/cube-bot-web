<script>
  import { fade } from 'svelte/transition';
  import { pages, events } from '../data/config';

  import { currentEvent } from '../stores/times';

  export let currentPage;
</script>

<div class="container" in:fade={{ duration: 250 }}>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 text-center">
    {#each events as e}
      <div class="col mt-4">
        <div
          class="card"
          on:click={() => {
            currentEvent.set(e);
            currentPage = pages.Timer;
          }}
        >
          <span class="cubing-icon cubing-icon-5x event-{e}" />
          <div class="card-footer bg-transparent">
            <h4 class="">{e}</h4>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .card {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
    transition-duration: 0.5s;
  }

  .card:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    transition-duration: 0.5s;
  }
</style>
