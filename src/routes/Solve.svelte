<script lang="ts">
  import * as R from "ramda";

  import Timer from "../lib/Timer.svelte";
  import TimeList from "../lib/TimeList.svelte";
  import {
    averageOfFiveCalculator,
    secondsToTime,
    parseTimesArray,
  } from "../tools/calculator.js";

  import { currentEvent, times } from "../stores/times.js";
  import { scrambleIndex } from "../stores/scrambles.js";
  import {
    displayScrambles,
    disableScramblesDisplayForBlind,
  } from "../stores/settings.js";
  import Scrambles from "../lib/Scrambles.svelte";
  import Svg from "../lib/Svg.svelte";

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
</script>

<div class="flex flex-row justify-evenly flex-wrap md:flex-nowrap">
  <div class="flex flex-col pl-2">
    <TimeList />
  </div>
  {#if R.equals(5, $scrambleIndex)}
    <div class="flex-col flex-auto flex items-center justify-center basis-1/2">
      <div class="text-4xl">Veuillez soumettre vos temps</div>

      <div class="flex-auto text-5xl flex items-center">
        {secondsToTime($times[index].solves[4][0])}
      </div>
      <div class="text-4xl">
        ao5:
        {secondsToTime(
          averageOfFiveCalculator(parseTimesArray($times[index].solves))
        )}
      </div>
    </div>
  {:else}
    <div
      class="flex-col flex-grow flex-shrink-0 flex items-center justify-center basis-1/3"
    >
      <Scrambles />
      <Timer />
    </div>
    {#if displayScramble}
      <Svg />
    {/if}
  {/if}
</div>
