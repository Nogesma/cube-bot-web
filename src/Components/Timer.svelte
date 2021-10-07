<script>
  import dayjs from 'dayjs';
  import * as R from 'ramda';

  import { msToSeconds, secondsToTime } from '../tools/calculator';
  import { currentEvent, times } from '../stores/times';
  import {
    useInspection,
    timerUpdate,
    runningTimerText,
  } from '../stores/settings';

  let startTime;
  let timeout;
  let inspectionTime = 0;
  let timerStatus = 0; // 0 = stopped, 1 = running, 2 = inspecting, 3 = waiting

  let hasInspection = $useInspection && R.not($currentEvent === '3BLD');
  let green = false;
  let red = false;
  let timerText = 'Ready';
  let finalTime;

  $: eventIndex = R.findIndex(R.propEq('event')($currentEvent))($times);
  $: solvesLens = R.lensPath([eventIndex, 'solves']);

  const newTime = (time, penalty) =>
    times.update(R.over(solvesLens, R.append([msToSeconds(time), penalty])));

  const displayTime = () =>
    (timerText = secondsToTime(msToSeconds(dayjs().diff(startTime))));

  const startTimer = () => {
    green = false;
    red = false;
    clearTimeout(timeout);
    inspectionTime = hasInspection ? msToSeconds(dayjs().diff(startTime)) : 0;
    startTime = dayjs();
    if ($timerUpdate) {
      timeout = setInterval(displayTime, 10);
    } else {
      timerText = $runningTimerText;
    }
  };

  const stopTimer = () => {
    finalTime = dayjs().diff(startTime);
    clearTimeout(timeout);
    timerText = secondsToTime(msToSeconds(finalTime));
    const penalty = inspectionTime < 15 ? 0 : inspectionTime < 17 ? 1 : 2;
    newTime(finalTime, penalty);
    red = true;
  };

  const timerSetReady = () => {
    if (!hasInspection) timerText = '0.00';
    green = true;
  };

  const startInspection = () => {
    green = false;
    red = true;
    startTime = dayjs();
    timerText = 15 - msToSeconds(dayjs().diff(startTime)).toFixed(0);
    timeout = setInterval(() => {
      const diff = 15 - msToSeconds(dayjs().diff(startTime)).toFixed(0);
      if (diff > 0) timerText = diff;
      else if (diff > -2) timerText = '+2';
      else timerText = 'DNF';
    }, 1000);
  };

  const down = (event) => {
    if (event.repeat) return;
    console.log(timerStatus);
    if (timerStatus === 1) {
      stopTimer();
      timerStatus = 0;
      return;
    }
    if (event.key !== ' ') return;
    if (timerStatus === 0) {
      timerSetReady();
      timerStatus = 3;
      return;
    }
    if (timerStatus === 2) timerSetReady();
  };

  const up = (event) => {
    if (event.key !== ' ') return;
    console.log(timerStatus);
    if (timerStatus === 3) {
      if (hasInspection) {
        startInspection();
        timerStatus = 2;
      } else {
        startTimer();
        timerStatus = 1;
      }
    } else if (timerStatus === 2) {
      startTimer();
      timerStatus = 1;
    } else if (timerStatus === 0) red = false;
  };
  export { up, down };
</script>

<svelte:window on:keydown={down} on:keyup={up} />

<h1 class="display-1 text-center" class:green class:red>
  {timerText}
</h1>

<style>
  .red {
    color: red;
  }

  .green {
    color: green;
  }
</style>
