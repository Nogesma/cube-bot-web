import { writable } from "svelte/store";
import * as R from "ramda";
import { events } from "../data/config";
import dayjs from "dayjs";

const times = writable(
  R.map((event) => ({ event, solves: [] }), [...events.keys()])
);
const date = writable(dayjs());
const currentEvent = writable("");

export { times, date, currentEvent };
