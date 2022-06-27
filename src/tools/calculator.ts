import {
  pipe,
  last,
  equals,
  always,
  head,
  cond,
  add,
  map,
  dropLast,
  divide,
  __,
  match,
  reduce,
  split,
  ifElse,
  filter,
  lt,
  sort,
  slice,
  sum,
  length,
  subtract,
} from "ramda";

const applyPenality = cond([
  [pipe(last, equals(2)), always(Infinity)],
  [pipe(last, equals(1)), pipe(head, add(2))],
  [pipe(last, equals(0)), head],
]);

const parseTimesArray = map(applyPenality);

const msToSeconds = pipe(String, dropLast<string>(1), divide(__, 100));

const secondsToTime = (time: number): string => {
  if (time === Infinity) {
    return "DNF";
  }

  const min = Math.floor(time / 60);
  let s = (time - min * 60).toFixed(2);
  if (min > 0 && s.length === 4) {
    s = "0" + s;
  }

  return `${min ? min + ":" : ""}${s}`;
};

const timeToSeconds = (time: string): number => {
  if (time === "DNF") {
    return Infinity;
  }

  return Number(
    head(
      match(
        /\d+(\.\d{1,2})?/g,
        String(reduce((acc, t) => 60 * acc + Number(t), 0, split(":", time)))
      )
    )
  );
};

const averageOfFiveCalculator = ifElse(
  pipe(filter(lt(0)), length, equals(5)),
  pipe(
    sort(subtract),
    slice(1, -1),
    sum,
    divide(__, 3),
    (x) => x.toFixed(2),
    Number
  ),
  always(-Infinity)
);

export {
  secondsToTime,
  timeToSeconds,
  parseTimesArray,
  applyPenality,
  averageOfFiveCalculator,
  msToSeconds,
};
