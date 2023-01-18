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
  toString,
  min
} from "ramda";

const applyPenality = cond<[number[]], number>([
  [pipe(last, equals(2)), always(Infinity)],
  [pipe(last, equals(1)), pipe(head, add(2))],
  [pipe(last, equals(0)), head],
]);

const parseTimesArray = map<number[], number>(applyPenality);

const msToSeconds = pipe<number[], string, string, number, number>(
  toString,
  dropLast(1),
  Number,
  divide(__, 100)
);

const secondsToTime = (time: number): string => {
  if (time === Infinity || time == -Infinity) {
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

const averageOfFiveCalculator = ifElse<[number[]], number, number>(
  pipe(filter(lt(0)), length, equals(5)),
  pipe(
    sort(subtract),
    (x) => slice(1, -1, x),
    sum,
    divide(__, 3),
    (x) => x.toFixed(2),
    Number
  ),
  always(Infinity)
);

const computeScore = (rank: number, numberOfContestants: number) =>
	min(100, Math.ceil((-50 / (numberOfContestants - 1)) * rank) + 100);

export {
  secondsToTime,
  timeToSeconds,
  parseTimesArray,
  applyPenality,
  averageOfFiveCalculator,
  msToSeconds,
  computeScore
};
