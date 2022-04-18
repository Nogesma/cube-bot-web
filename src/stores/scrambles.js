import { derived, writable } from 'svelte/store';
import { currentEvent } from './times';
import { convertSvgColourScheme } from '../tools/colourScheme';
import { includes } from 'ramda';
import * as wasm from 'scr-to-svg';

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
    if (
      $currentEvent &&
      !includes($currentEvent, ['333', '222', 'OH', '3BLD', '444', '555'])
    ) {
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

const getSvg = async (e, s) => {
  if (typeof getSvg.is_init === 'undefined') {
    await wasm.default();
    getSvg.is_init = 0;
  }

  if (s === 'Chargement des mélanges...') return '';
  return convertSvgColourScheme(e, wasm.get_scramble_svg(e, s));
};
export { scrambleIndex, svg, scrambleString, getSvg };
