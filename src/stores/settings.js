import { writable } from 'svelte/store';
import * as R from 'ramda';

import {
  cubeDefaultColourScheme,
  megaDefaultColourScheme,
  pyraDefaultColourScheme,
  sq1DefaultColourScheme,
} from '../data/config';

const createColourScheme = (colourScheme, itemName) => {
  const { subscribe, set } = writable(
    JSON.parse(localStorage.getItem(itemName)) ?? R.clone(colourScheme)
  );

  return {
    subscribe,
    set,
    reset: () => set(R.clone(colourScheme)),
  };
};

const cubeColourScheme = createColourScheme(
  cubeDefaultColourScheme,
  'cubeColourScheme'
);
const pyraColourScheme = createColourScheme(
  pyraDefaultColourScheme,
  'pyraColourScheme'
);
const megaColourScheme = createColourScheme(
  megaDefaultColourScheme,
  'megaColourScheme'
);
const sq1ColourScheme = createColourScheme(
  sq1DefaultColourScheme,
  'sq1ColourScheme'
);

const displayScrambles = writable(
  JSON.parse(localStorage.getItem('displayScrambles')) ?? true
);
const disableScramblesDisplayForBlind = writable(
  JSON.parse(localStorage.getItem('disableScramblesDisplayForBlind')) ?? true
);
const scrambleSize = writable(
  JSON.parse(localStorage.getItem('scrambleSize')) ?? 10
);

cubeColourScheme.subscribe((val) =>
  localStorage.setItem('cubeColourScheme', JSON.stringify(val))
);
pyraColourScheme.subscribe((val) =>
  localStorage.setItem('pyraColourScheme', JSON.stringify(val))
);
megaColourScheme.subscribe((val) =>
  localStorage.setItem('megaColourScheme', JSON.stringify(val))
);
sq1ColourScheme.subscribe((val) =>
  localStorage.setItem('sq1ColourScheme', JSON.stringify(val))
);

displayScrambles.subscribe((val) =>
  localStorage.setItem('displayScrambles', val)
);
disableScramblesDisplayForBlind.subscribe((val) =>
  localStorage.setItem('disableScramblesDisplayForBlind', val)
);
scrambleSize.subscribe((val) => localStorage.setItem('scrambleSize', val));

export {
  cubeColourScheme,
  pyraColourScheme,
  megaColourScheme,
  sq1ColourScheme,
  displayScrambles,
  disableScramblesDisplayForBlind,
  scrambleSize,
};
