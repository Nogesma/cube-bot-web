<script lang="ts">
  import dayjs, { Dayjs } from "dayjs";
  import * as R from "ramda";

  import { msToSeconds, secondsToTime } from "../tools/calculator";
  import { currentEvent, times } from "../stores/times";
  import {
    runningTimerText,
    timerUpdate,
    useInspection,
  } from "../stores/settings.js";

  let startTime: Dayjs;
  let timeout: NodeJS.Timer;
  let inspectionTime = 0;
  let timerStatus = 0; // 0 = stopped, 1 = running, 2 = inspecting, 3 = waiting

  let hasInspection = $useInspection && R.not($currentEvent === "3BLD");
  let green = false;
  let red = false;
  let timerText = "Ready";
  let finalTime;

  $: eventIndex = R.findIndex(R.propEq("event")($currentEvent))($times);
  $: solvesLens = R.lensPath([eventIndex, "solves"]);

  const newTime = (time: number, penalty: number) =>
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
    if (!hasInspection) timerText = "0.00";
    green = true;
  };

  const startInspection = () => {
    green = false;
    red = true;
    startTime = dayjs();
    timerText = (15 - msToSeconds(dayjs().diff(startTime))).toFixed(0);
    timeout = setInterval(() => {
      const diff = 15 - msToSeconds(dayjs().diff(startTime));
      if (diff > 0) timerText = diff.toFixed(0);
      else if (diff > -2) timerText = "+2";
      else timerText = "DNF";
    }, 1000);
  };

  const down = (event: KeyboardEvent) => {
    if (event.key === " ") event.preventDefault();
    if (event.repeat) return;
    if (timerStatus === 1) {
      stopTimer();
      timerStatus = 0;
      return;
    }
    if (event.key !== " ") return;
    if (timerStatus === 0) {
      timerSetReady();
      timerStatus = 3;
      return;
    }
    if (timerStatus === 2) timerSetReady();
  };

  const up = (event: KeyboardEvent) => {
    if (event.key !== " ") return;
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

<div class="flex-auto text-5xl flex items-center basis-3/4">
  <div class="{green ? 'text-success' : ''} {red ? 'text-error' : ''}">
    {timerText}
  </div>
</div>
