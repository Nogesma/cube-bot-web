import { derived, writable } from 'svelte/store';
import { currentEvent } from './times';
import { convertSvgColourScheme } from '../tools/colourScheme';

const scrambles = derived(
  currentEvent,
  ($currentEvent, set) => {
    if ($currentEvent) {
      set([{ scrambleString: 'Chargement des mélanges...' }]);
      fetch(`/api/scrambles/${$currentEvent}/`)
        .then((res) =>
          res.ok
            ? res
            : set([
                {
                  scrambleString:
                    'Erreur lors du chargement des mélanges. Rechargez la page pour réessayer.',
                },
              ])
        )
        .then((res) => res.json())
        .then((res) => set(res?.scrambles));
    } else {
      set([{ scrambleString: 'Chargement des mélanges...' }]);
    }
  },
  [{ scrambleString: 'Chargement des mélanges...' }]
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
