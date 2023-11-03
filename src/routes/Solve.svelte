<script lang="ts">
  import * as R from "ramda";

  import Timer from "../lib/Timer.svelte";
  import TimeList from "../lib/TimeList.svelte";
  import {
    averageOfFiveCalculator,
    secondsToTime,
    parseTimesArray,
    meanOfThreeCalculator,
  } from "../tools/calculator.js";

  import { currentEvent, times } from "../stores/times.js";
  import { scrambleIndex } from "../stores/scrambles.js";
  import {
    displayScrambles,
    disableScramblesDisplayForBlind,
  } from "../stores/settings.js";
  import Scrambles from "../lib/Scrambles.svelte";
  import Svg from "../lib/Svg.svelte";
  import { push } from "svelte-spa-router";
  import dayjs from "dayjs";
  import { is } from "ramda";

  export let params = { event: "333" };

  currentEvent.set(params.event);

  const newScrambleIndex = (i: number) => {
    scrambleIndex.set(i);
  };

  const displayScrambleForEvent = (
    display: boolean,
    event: string,
    disable: boolean
  ) => {
    if (!display) return false;
    if (event !== "3BLD") return true;
    return !disable;
  };

  $: index = R.findIndex(R.propEq("event")($currentEvent))($times);
  $: newScrambleIndex(R.length($times[index].solves));
  $: displayScramble = displayScrambleForEvent(
    $displayScrambles,
    $currentEvent,
    $disableScramblesDisplayForBlind
  );

  $: isMo3 = $currentEvent === "666" || $currentEvent === "777";
</script>

<div class="flex flex-col h-full justify-evenly">
  {#if R.equals(isMo3 ? 3 : 5, $scrambleIndex)}
    <div class="flex-col flex-auto flex items-center justify-center basis-full">
      <div
        class="font-mono tracking-tight whitespace-pre-line p-2 text-xl text-center lg:text-3xl"
      >
        Veuillez soumettre vos temps
      </div>

      <div
        class="flex-auto text-5xl flex justify-center items-center bg-base-100 w-full"
      >
        {secondsToTime(
          $times[index].solves[$times[index].solves.length - 1][0]
        )}
      </div>
      <div
        class="flex-auto text-5xl flex justify-center items-center bg-base-100 w-full"
      >
        {isMo3 ? "mo3" : "ao5"}:
        {secondsToTime(
          (isMo3 ? meanOfThreeCalculator : averageOfFiveCalculator)(
            parseTimesArray($times[index].solves)
          )
        )}
      </div>

      <div
        class="flex-auto text-5xl flex justify-center items-center bg-base-100 w-full gap-4"
      >
        <button
          class="btn"
          on:click={() =>
            push(
              `/rankings/${$currentEvent}/day/${dayjs().format("YYYY-MM-DD")}`
            )}>Classement du jour</button
        >
        <button
          class="btn"
          on:click={() =>
            push(
              `/rankings/${$currentEvent}/month/${dayjs().format("YYYY-MM-DD")}`
            )}>Classement du mois</button
        >
      </div>
    </div>
  {:else}
    <div class="flex-col flex-auto flex items-center justify-center basis-full">
      <Scrambles />
      <Timer />
    </div>
  {/if}
  <div class="flex flex-row flex-auto">
    <TimeList />
    {#if displayScramble && $scrambleIndex !== (isMo3 ? 3 : 5)}
      <Svg />
    {/if}
  </div>
</div>