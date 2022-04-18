import { derived, writable } from 'svelte/store';
import { currentEvent } from './times';
import { convertSvgColourScheme } from '../tools/colourScheme';
import { includes } from 'ramda';

const scrambles = derived(
  currentEvent,
  ($currentEvent, set) => {
    if ($currentEvent) {
      set(['Chargement des mélanges...']);
      fetch(`/api/scrambles/${$currentEvent}`)
        .then((res) =>
          res.ok
            ? res
            : set([
                'Erreur lors du chargement des mélanges. Rechargez la page pour réessayer.',
              ])
        )
        .then((res) => res.json())
        .then((res) => set(res?.scrambles));
    } else {
      set(['Chargement des mélanges...']);
    }
  },
  ['Chargement des mélanges...']
);

const scramblesSvg = derived(
  currentEvent,
  async ($currentEvent, set) => {
    if ($currentEvent && !includes($currentEvent, ['333', '222', 'OH'])) {
      set([]);
      fetch(`/api/svg/${$currentEvent}`)
        .then((res) => (res.ok ? res : set([])))
        .then((res) => res.json())
        .then((res) => set(res?.svg));
    } else {
      set([]);
    }
  },
  []
);

const scrambleIndex = writable(0);

const svg = derived(
  [scramblesSvg, scrambleIndex, currentEvent],
  ([$scrambles, $scrambleIndex, $currentEvent]) =>
    convertSvgColourScheme($currentEvent, $scrambles[$scrambleIndex] ?? '')
);

const scrambleString = derived(
  [scrambles, scrambleIndex],
  ([$scrambles, $scrambleIndex]) => $scrambles[$scrambleIndex] ?? ''
);

export { scrambleIndex, svg, scrambleString };
