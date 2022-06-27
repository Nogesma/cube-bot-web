import { derived, writable } from "svelte/store";
import { currentEvent } from "./times";
import { convertSvgColourScheme } from "../tools/colourScheme.js";
import { includes } from "ramda";
import init, { get_scramble_svg } from "scr-to-svg";
import axios from "axios";

const scrambles = derived(
  currentEvent,
  ($currentEvent, set) => {
    if ($currentEvent) {
      set(["Chargement des mélanges..."]);
      axios
        .get(`http://localhost:3000/api/scrambles/${$currentEvent}`, {
          withCredentials: true,
        })
        .then(({ data }) => set(data.scrambles))
        .catch(() =>
          set([
            "Erreur lors du chargement des mélanges. Rechargez la page pour réessayer.",
          ])
        );
    } else {
      set(["Chargement des mélanges..."]);
    }
  },
  ["Chargement des mélanges..."]
);

const scramblesSvg = derived(
  currentEvent,
  async ($currentEvent, set) => {
    if (
      $currentEvent &&
      !includes($currentEvent, ["333", "222", "OH", "3BLD", "444", "555"])
    ) {
      set([]);
      axios
        .get(`http://localhost:3000/api/svg/${$currentEvent}`, {
          withCredentials: true,
        })
        .then(({ data }) => set(data.svg))
        .catch(() => set([]));
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
    convertSvgColourScheme($currentEvent, $scrambles[$scrambleIndex] ?? "")
);

const scrambleString = derived(
  [scrambles, scrambleIndex],
  ([$scrambles, $scrambleIndex]) => $scrambles[$scrambleIndex] ?? ""
);

const getSvg = async (e: string, s: string) => {
  if (typeof getSvg.is_init === "undefined") {
    await init();
    getSvg.is_init = 0;
  }

  if (s === "Chargement des mélanges...") return "";

  return get_scramble_svg(e, s);
};
export { scrambleIndex, svg, scrambleString, getSvg };
