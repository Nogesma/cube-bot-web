<script>
  //TODO: Set bigger touch down zone for mobile users
  import dayjs from 'dayjs';

  import { msToSeconds, secondsToTime } from '../tools/calculator';
  import * as R from 'ramda';
  import { currentEvent, times } from '../stores/times';

  let startTime;
  let timeout;
  let allowed = true;
  let green = false;
  let red = false;
  let running = false;
  let timerText = 'Ready';
  let finalTime;
  let waiting = false;

  $: eventIndex = R.findIndex(R.propEq('event')($currentEvent))($times);
  $: solvesLens = R.lensPath([eventIndex, 'solves']);

  const newTime = (time) =>
    times.update(R.over(solvesLens, R.append([msToSeconds(time), 0])));

  const displayTime = () =>
    (timerText = secondsToTime(msToSeconds(dayjs().diff(startTime))));

  const startTimer = () => {
    running = true;
    timeout = setInterval(displayTime, 10);
    startTime = dayjs();
    green = false;
  };

  const stopTimer = () => {
    running = false;
    waiting = true;
    red = true;
    clearTimeout(timeout);

    finalTime = dayjs().diff(startTime);
    timerText = secondsToTime(msToSeconds(finalTime));
    newTime(finalTime);
  };

  const timerSetReady = () => {
    waiting = false;
    timerText = '0.00';
    green = true;
  };

  const timerAfterStop = () => {
    red = false;
  };

  const down = (event) => {
    if (!allowed) {
      return;
    }
    if (running) {
      stopTimer();
    } else if (event.key === ' ') {
      timerSetReady();
    }
    allowed = false;
  };

  const up = (event) => {
    if (!running && !waiting && event.key === ' ') {
      startTimer();
    } else {
      timerAfterStop();
    }
    allowed = true;
  };
</script>

<svelte:window on:keydown={down} on:keyup={up} />

<h1
  class="display-1 text-center"
  class:green
  class:red
  on:touchstart={() => down({ key: ' ' })}
  on:touchend={() => up({ key: ' ' })}
>
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
