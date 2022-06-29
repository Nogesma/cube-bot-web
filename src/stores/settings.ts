import { writable } from "svelte/store";
import * as R from "ramda";

import {
  type ColourScheme,
  cubeDefaultColourScheme,
  megaDefaultColourScheme,
  pyraDefaultColourScheme,
  sq1DefaultColourScheme,
} from "../data/config";

const createColourScheme = (colourScheme: ColourScheme, itemName: string) => {
  const { subscribe, set } = writable(
    localStorage[itemName]
      ? JSON.parse(localStorage[itemName])
      : R.clone(colourScheme)
  );

  return {
    subscribe,
    set,
    reset: () => set(R.clone(colourScheme)),
  };
};

const cubeColourScheme = createColourScheme(
  cubeDefaultColourScheme,
  "cubeColourScheme"
);
const pyraColourScheme = createColourScheme(
  pyraDefaultColourScheme,
  "pyraColourScheme"
);
const megaColourScheme = createColourScheme(
  megaDefaultColourScheme,
  "megaColourScheme"
);
const sq1ColourScheme = createColourScheme(
  sq1DefaultColourScheme,
  "sq1ColourScheme"
);

const displayScrambles = writable(
  JSON.parse(localStorage.getItem("displayScrambles") ?? "true")
);
const disableScramblesDisplayForBlind = writable(
  JSON.parse(localStorage.getItem("disableScramblesDisplayForBlind") ?? "true")
);
const scrambleSize = writable(
  JSON.parse(localStorage.getItem("scrambleSize") ?? "30")
);
const useInspection = writable(
  JSON.parse(localStorage.getItem("useInspection") ?? "false")
);
const timerUpdate = writable(
  JSON.parse(localStorage.getItem("timerUpdate") ?? "true")
);
const runningTimerText = writable(
  localStorage.getItem("runningTimerText") ?? "⏱"
);

const login = writable(false);

cubeColourScheme.subscribe((val) =>
  localStorage.setItem("cubeColourScheme", JSON.stringify(val))
);
pyraColourScheme.subscribe((val) =>
  localStorage.setItem("pyraColourScheme", JSON.stringify(val))
);
megaColourScheme.subscribe((val) =>
  localStorage.setItem("megaColourScheme", JSON.stringify(val))
);
sq1ColourScheme.subscribe((val) =>
  localStorage.setItem("sq1ColourScheme", JSON.stringify(val))
);

displayScrambles.subscribe((val) =>
  localStorage.setItem("displayScrambles", val)
);
disableScramblesDisplayForBlind.subscribe((val) =>
  localStorage.setItem("disableScramblesDisplayForBlind", val)
);
scrambleSize.subscribe((val) => localStorage.setItem("scrambleSize", val));
useInspection.subscribe((val) => localStorage.setItem("useInspection", val));
timerUpdate.subscribe((val) => localStorage.setItem("timerUpdate", val));
runningTimerText.subscribe((val) =>
  localStorage.setItem("runningTimerText", val)
);

export {
  cubeColourScheme,
  pyraColourScheme,
  megaColourScheme,
  sq1ColourScheme,
  displayScrambles,
  disableScramblesDisplayForBlind,
  scrambleSize,
  useInspection,
  timerUpdate,
  runningTimerText,
  login,
};
