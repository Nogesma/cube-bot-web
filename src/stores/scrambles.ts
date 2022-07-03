import { derived, writable } from "svelte/store";
import type { Readable } from "svelte/store";
import { currentEvent } from "./times";
import { convertSvgColourScheme } from "../tools/colourScheme.js";
import { includes } from "ramda";
import init, { get_scramble_svg } from "scr-to-svg";
import axios from "axios";
import { push } from "svelte-spa-router";

const scrambles = derived(
  currentEvent,
  ($currentEvent, set) => {
    if ($currentEvent) {
      set(["Chargement des mélanges..."]);
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URI}/api/scrambles/${$currentEvent}`,
          {
            withCredentials: true,
          }
        )
        .then(({ data }) => set(data.scrambles))
        .catch(() => {
          set([
            "Erreur lors du chargement des mélanges. Rechargez la page pour réessayer.",
          ]);
          push("/auth/login");
        });
    } else {
      set(["Chargement des mélanges..."]);
    }
  },
  ["Chargement des mélanges..."]
);

const scramblesSvg: Readable<string[]> = derived(
  currentEvent,
  ($currentEvent, set) => {
    if (
      $currentEvent &&
      !includes($currentEvent, ["333", "222", "OH", "3BLD", "444", "555"])
    ) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URI}/api/svg/${$currentEvent}`, {
          withCredentials: true,
        })
        .then(({ data }) => set(data.svg))
        .catch(() => set([]));
    }
    set([]);
  },
  []
);

const scrambleIndex = writable(0);

const svg: Readable<string> = derived(
  [scramblesSvg, scrambleIndex, currentEvent],
  ([$scramblesSvg, $scrambleIndex, $currentEvent]) =>
    convertSvgColourScheme(
      $currentEvent,
      $scramblesSvg[$scrambleIndex]
    ) as string
);

const scrambleString = derived(
  [scrambles, scrambleIndex],
  ([$scrambles, $scrambleIndex]) => $scrambles[$scrambleIndex] ?? ""
);

await init();

const getSvg = (e: string, s: string) => {
  if (s === "Chargement des mélanges...") return "";

  return get_scramble_svg(e, s);
};

export { scrambleIndex, svg, scrambleString, getSvg, scramblesSvg };
