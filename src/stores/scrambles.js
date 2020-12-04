import { derived, writable } from 'svelte/store';
import { currentEvent } from './times';
import dayjs from 'dayjs';
import { convertSvgColourScheme } from '../tools/colourScheme';

const scrambles = derived(
  currentEvent,
  ($currentEvent, set) => {
    if ($currentEvent) {
      fetch(`/api/scrambles/${$currentEvent}/${dayjs().format('YYYY-MM-DD')}`)
        .then((res) => res.json())
        .then((res) => set(res?.scrambles));
    } else {
      set([{ scrambleString: 'Loading scrambles...' }]);
    }
  },
  [{ scrambleString: 'Loading scrambles...' }]
);

const scrambleIndex = writable(0);

const svg = derived(
  [scrambles, scrambleIndex, currentEvent],
  ([$scrambles, $scrambleIndex, $currentEvent]) =>
    convertSvgColourScheme($currentEvent, $scrambles[$scrambleIndex]?.svg ?? '')
);

const scrambleString = derived(
  [scrambles, scrambleIndex],
  ([$scrambles, $scrambleIndex]) =>
    $scrambles[$scrambleIndex]?.scrambleString ?? ''
);

export { scrambleIndex, svg, scrambleString };
