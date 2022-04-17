<script>
  import { fade } from 'svelte/transition';
  import * as R from 'ramda';

  import Timer from './Timer.svelte';
  import TimeList from './TimeList.svelte';
  import {
    averageOfFiveCalculator,
    secondsToTime,
    parseTimesArray,
  } from '../tools/calculator';

  import { times, currentEvent } from '../stores/times';
  import { scrambleIndex } from '../stores/scrambles';
  import {
    displayScrambles,
    disableScramblesDisplayForBlind,
  } from '../stores/settings';
  import Scrambles from './Scrambles.svelte';
  import Svg from './Svg.svelte';

  const newScrambleIndex = (i) => {
    scrambleIndex.set(i);
  };

  const displayScrambleForEvent = (display, event, disable) => {
    if (!display) return false;
    if (event !== '3BLD') return true;
    return !disable;
  };

  $: index = R.findIndex(R.propEq('event')($currentEvent))($times);
  $: newScrambleIndex(R.length($times[index].solves));
  $: displayScramble = displayScrambleForEvent(
    $displayScrambles,
    $currentEvent,
    $disableScramblesDisplayForBlind
  );
</script>

<div class="container-fluid h-100" in:fade={{ duration: 250 }}>
  <div class="row h-100">
    <div class="col-sm-8 h-100">
      <div class="row">
        <Scrambles />
      </div>
      <div class="row">
        {#if R.equals(5, $scrambleIndex)}
          <h1 class="display-1">Veuillez soumettre vos temps</h1>
          <h1 class="display-1 text-center">
            {secondsToTime($times[index].solves[4][0])}
          </h1>
        {:else}
          <Timer />
        {/if}
      </div>
    </div>
    <div class="col-sm-4 h-100">
      <TimeList />
      {#if R.equals(5, $scrambleIndex)}
        <p>
          ao5:
          {secondsToTime(
            averageOfFiveCalculator(parseTimesArray($times[index].solves))
          )}
        </p>
      {:else if displayScramble}
        <Svg />
      {/if}
    </div>
  </div>
</div>
