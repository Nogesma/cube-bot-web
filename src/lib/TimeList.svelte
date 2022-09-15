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

  const deleteLastTime = () => {
    const modal: HTMLInputElement = document.getElementById(
      "update-time"
    ) as HTMLInputElement;

    modal.checked = false;
    times.update(R.over(solvesLens, R.dropLast(1)));
  };

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
    const modal: HTMLInputElement = isSubmit
      ? (document.getElementById("submit-time") as HTMLInputElement)
      : (document.getElementById("add-time") as HTMLInputElement);

    if (event.key === "Escape") modal.checked = false;

    if (event.key === "Enter") {
      if (!modal) return;

      modal.checked = !modal.checked;

      if (isSubmit && modal.checked)
        response = (await submitEvent($times[eventIndex])) as string;
      else if (!isSubmit)
        modal.checked
          ? document.getElementById("time-input")?.focus()
          : addTime();
    }
  };

  let selectedTimeIndex = 0;
</script>

<svelte:window on:keydown={handleEnter} />

<div class="flex flex-col m-2 flex-auto max-w-md">
  <table class="table table-zebra w-full mb-1">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Temps</th>
      </tr>
    </thead>
    <tbody>
      {#each solves as s, i}
        <tr>
          <th>{i + 1}</th>
          <td>
            <label
              for="update-time"
              on:click={async () => (selectedTimeIndex = i)}
            >
              {R.pipe(applyPenality, secondsToTime)(s)}
              {s[1] === 1 ? "+" : ""}</label
            >
          </td>
        </tr>
      {/each}
      {#each R.times(R.add(R.length(solves)), 5 - R.length(solves)) as i}
        <tr>
          <th>{i + 1}</th>
          <td />
        </tr>
      {/each}
    </tbody>
  </table>

  {#if R.equals(5, R.length(solves))}
    <label
      class="btn modal-button"
      for="submit-time"
      on:click={async () => (response = await submitEvent($times[eventIndex]))}
      >Soumettre les temps</label
    >
  {:else}
    <label class="btn modal-button font-bold w-full" for="add-time">
      Ajouter un temps
    </label>
  {/if}
</div>

<input type="checkbox" id="submit-time" class="modal-toggle" />
<label for="submit-time" class="modal modal-pointer">
  <label class="modal-box relative" for="">
    <h3 class="font-bold text-lg">Résultats</h3>
    <p class="py-4">
      {#if !response}
        <Loading />
      {:else}
        {response}
      {/if}
    </p>
  </label>
</label>

<input type="checkbox" id="add-time" class="modal-toggle" />
<label for="add-time" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="font-bold text-lg">Temps</h3>
    <div class="flex flex-row flex-auto justify-around mt-4">
      <input
        type="text"
        id="time-input"
        bind:value={inputTime}
        placeholder="1:23.456"
        class="input input-bordered w-full max-w-xs"
      />
      <label for="add-time" on:click={addTime} class="btn ml-2">Valider</label>
    </div>
  </label>
</label>

<input type="checkbox" id="update-time" class="modal-toggle" />
<label for="update-time" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    {#if selectedTimeIndex < solves.length}
      <div class="flex flex-row justify-evenly place-items-center">
        <h3 class="font-bold text-lg text-center">
          {R.pipe(applyPenality, secondsToTime)(solves[selectedTimeIndex])}
          {solves[selectedTimeIndex][1] === 1 ? "+" : ""}
        </h3>
        <div class="btn-group">
          {#each ["OK", "+2", "DNF"] as penality, p}
            <button
              class="btn btn-md {solves[selectedTimeIndex][1] === p
                ? 'btn-active'
                : ''}"
              on:click={() => updatePenality(selectedTimeIndex, p)}
              >{penality}</button
            >
          {/each}
          {#if R.equals(selectedTimeIndex + 1, R.length(solves))}
            <button class="btn btn-md" on:click={deleteLastTime}>X</button>
          {/if}
        </div>
      </div>
    {/if}
  </label>
</label>
