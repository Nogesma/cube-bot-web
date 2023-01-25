<script lang="ts">
  import * as R from "ramda";

  import {
    applyPenality,
    timeToSeconds,
    secondsToTime,
  } from "../tools/calculator.js";
  import { submitEvent } from "../tools/submitTimes.js";

  import { currentEvent, times } from "../stores/times.js";
  import Loading from "./Loading.svelte";

  let solves: number[][];

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
  let response = "";

  const handleEnter = async (event: KeyboardEvent) => {
    if (event.repeat) return;

    const isSubmit = R.equals(5, R.length(solves));

    if (event.key === "Escape") showInput = false;

    if (event.key === "Enter") {
      if (isSubmit && !showInput)
        response = (await submitEvent($times[eventIndex])) as string;
      else if (!isSubmit)
        showInput
          ? addTime()
          : window.setTimeout(
              () => document.getElementById("time-input")?.focus(),
              10
            );

      showInput = !showInput;
    }
  };

  let selectedTimeIndex = 0;
  let isChecked = false;
  let showInput = false;
  let menu: HTMLElement;

  const onPageClick = (e: MouseEvent) => {
    if (e.target === menu || menu?.contains(e.target as Node)) return;
    showInput = false;
  };
</script>

<svelte:window on:keydown={handleEnter} />

<div class="flex flex-col m-2 flex-auto max-w-md">
  <table class="table table-zebra w-full mb-1">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Temps</th>
        <th class="hidden lg:table-cell" scope="col">Penalite</th>
      </tr>
    </thead>
    <tbody>
      {#each solves as s, i}
        <tr
          class="lg:pointer-events-none lg:cursor-default"
          on:click={() => {
            if (matchMedia("(min-width: 1024px)").matches) return;
            selectedTimeIndex = i;
            isChecked = true;
          }}
        >
          <th>
            {#if solves.length === i + 1}
              <button
                class="text-red-600 pointer-events-auto"
                on:click={deleteLastTime}>X</button
              >
            {:else}
              {i + 1}
            {/if}
          </th>
          <td>
            {R.pipe(applyPenality, secondsToTime)(s)}
            {s[1] === 1 ? "+" : ""}
          </td>
          <td class="hidden lg:table-cell">
            <div class="btn-group flex-nowrap">
              {#each ["OK", "+2", "DNF"] as penality, p}
                <button
                  class="btn btn-xs {solves[i][1] === p
                    ? 'btn-active'
                    : ''} pointer-events-auto"
                  on:click={() => updatePenality(i, p)}>{penality}</button
                >
              {/each}
            </div>
          </td>
        </tr>
      {/each}
      {#each R.times(R.add(R.length(solves)), 5 - R.length(solves)) as i}
        <tr>
          <th>{i + 1}</th>
          <td />
          <td class="hidden lg:table-cell" />
        </tr>
      {/each}
    </tbody>
  </table>

  {#if R.equals(5, R.length(solves))}
    <div
      class="btn"
      on:click={async () => {
        showInput = true;
        response = await submitEvent($times[eventIndex]);
      }}
    >
      Soumettre les temps
    </div>
  {:else}
    <button class="btn font-bold w-full" on:click={() => (showInput = true)}>
      Ajouter un temps
    </button>
  {/if}
</div>

{#if showInput}
  <div
    class="bg-transparent/30 w-full h-full absolute z-20"
    style="top: 0px; left: 0px;"
    on:click={onPageClick}
  >
    <div
      bind:this={menu}
      style="top: 50%; left: 50%;transform: translate(-50%, -50%);"
      class="card fixed bg-base-200 z-40 lg:w-1/3 w-11/12"
    >
      <div class="card-body">
        {#if R.equals(5, R.length(solves))}
          <h3 class="card-title">Résultats</h3>
          <p class="py-4">
            {#if !response}
              <Loading />
            {:else}
              {response}
            {/if}
          </p>
        {:else}
          <h3 class="card-title">Temps</h3>
          <input
            type="text"
            bind:value={inputTime}
            autofocus
            placeholder="1:23.456"
            class="input input-bordered w-full mt-2"
          />
          <button on:click={addTime} class="btn w-full mt-2">Valider</button>
        {/if}
      </div>
    </div>
  </div>
{/if}

<input
  type="checkbox"
  id="update-time"
  class="modal-toggle"
  bind:checked={isChecked}
/>
<label for="update-time" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <div class="flex flex-row justify-evenly place-items-center">
      <h3 class="font-bold text-lg text-center">
        {#if selectedTimeIndex < solves.length}
          {R.pipe(applyPenality, secondsToTime)(solves[selectedTimeIndex])}
          {solves[selectedTimeIndex][1] === 1 ? "+" : ""}
        {/if}
      </h3>
      <div class="btn-group">
        {#if selectedTimeIndex < solves.length}
          {#each ["OK", "+2", "DNF"] as penality, p}
            <button
              class="btn btn-md {solves[selectedTimeIndex][1] === p
                ? 'btn-active'
                : ''}"
              on:click={() => updatePenality(selectedTimeIndex, p)}
              >{penality}</button
            >
          {/each}
        {/if}
      </div>
    </div>
  </label>
</label>
