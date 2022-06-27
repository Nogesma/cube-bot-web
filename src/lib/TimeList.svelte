<script lang="ts">
  // TODO: Time input in s over 60, ex: 65.10
  // TODO: Time input validation on enter
  import * as R from "ramda";
  import { onMount } from "svelte";

  import {
    applyPenality,
    timeToSeconds,
    secondsToTime,
  } from "../tools/calculator.js";
  import { submitEvent } from "../tools/submitTimes.js";

  import { currentEvent, times } from "../stores/times.js";
  import Loading from "./Loading.svelte";

  $: eventIndex = R.findIndex(R.propEq("event")($currentEvent))($times);
  $: solvesLens = R.lensPath([eventIndex, "solves"]);
  $: solves = R.view(solvesLens, $times);

  const newTime = (time: number) =>
    times.update(R.over(solvesLens, R.append([time, 0])));

  const addTime = () => {
    newTime(timeToSeconds(inputTime));
    inputTime = "";
  };

  const deleteLastTime = () => times.update(R.over(solvesLens, R.dropLast(1)));

  const updatePenality = (i: number, a: number) => {
    times.update((t) =>
      R.over(solvesLens, (x: number[][]) => R.update(i, [x[i][0], a], x), t)
    );
  };

  let inputTime = "";

  let isModalShown: boolean;

  onMount(() => {
    const modal = document.getElementById("submit-time");
    if (!modal) return;
    modal.addEventListener("hide.bs.modal", () => (isModalShown = false));
    modal.addEventListener("show.bs.modal", () => (isModalShown = true));
  });

  let response = "";
</script>

<table class="table table-zebra w-full">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Temps</th>
      <th scope="col">Penalite</th>
    </tr>
  </thead>
  <tbody>
    {#each R.times(R.identity, 5) as i}
      <tr>
        <th>{i + 1}</th>
        {#if R.nth(i, solves)}
          <td>
            {R.pipe(R.nth, applyPenality, secondsToTime)(i, solves) +
              (solves[i][1] === 1 ? "+" : "")}
          </td>
          <td>
            <div class="btn-group">
              {#each ["OK", "+2", "DNF"] as penality, p}
                <button
                  class="btn btn-xs {solves[i][1] === p ? 'btn-active' : ''}"
                  on:click={() => updatePenality(i, p)}>{penality}</button
                >
              {/each}
              {#if R.equals(i + 1, R.length(solves))}
                <button class="btn btn-xs" on:click={deleteLastTime}>X</button>
              {/if}
            </div>
          </td>
        {:else}
          <td />
          <td />
        {/if}
      </tr>
    {/each}
  </tbody>
</table>

<div class="flex flex-grow-0 content-start justify-center pb-2">
  {#if R.equals(5, R.length(solves))}
    <label
      class="btn modal-button"
      for="submit-time"
      on:click={async () => (response = await submitEvent($times[eventIndex]))}
      >Soumettre les temps</label
    >
  {:else}
    <label class="btn modal-button" for="add-time">Ajouter un temps</label>
  {/if}
</div>

<!--<input type="checkbox" id="submit-time" class="modal-toggle" />-->
<!--<label for="submit-time" class="modal modal-pointer">-->
<!--  <label class="modal-box relative" for="">-->
<!--    <h3 class="font-bold text-lg">Résultats</h3>-->
<!--    <p class="py-4">-->
<!--      {#if !response}-->
<!--        <Loading />-->
<!--      {:else}-->
<!--        {response}-->
<!--      {/if}-->
<!--    </p>-->
<!--  </label>-->
<!--</label>-->
