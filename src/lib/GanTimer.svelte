<script lang="ts">
  import dayjs, { Dayjs } from "dayjs";
  import * as R from "ramda";
  import { debounceTime, fromEvent, interval, merge, tap, Subscription } from 'rxjs';
  import {
    connectGanTimer,
    makeTimeFromTimestamp,
    GanTimerState,
  } from "../tools/ganBluetooth";
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
  async function connete_timne() {
  console.log("dsqfdskljfdsfsd")
   var conn = await connectGanTimer();
   console.log(conn.events$);
	conn.events$.subscribe((evt)  => {
    switch (evt.state) {
        case GanTimerState.RUNNING:
			console.log("running");
			console.log(timerStatus);
            if (timerStatus === 0) {
			startTimer();
			timerStatus = 1;
			}
            break;
        case GanTimerState.STOPPED:
                if (timerStatus === 1) {
					console.log("stopped");
					stopTimer();
					timerStatus = 0;
				}
            break;
        default:
            console.log(`Timer changed state to ${GanTimerState[evt.state]}`);
    }
});};
</script>
<style>
	.buton{
		width:50px;
	}
</style>
<input on:click={connete_timne} type="image" id="image" class="buton" alt="Login" src="https://www.svgrepo.com/show/150129/bluetooth.svg" />