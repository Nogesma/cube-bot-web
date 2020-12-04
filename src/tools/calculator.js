import * as R from 'ramda';

const applyPenality = R.cond([
  [R.pipe(R.last, R.equals(2)), R.always(Infinity)],
  [R.pipe(R.last, R.equals(1)), R.pipe(R.head, R.add(2))],
  [R.pipe(R.last, R.equals(0)), R.head],
]);

const parseTimesArray = R.map(applyPenality);

const msToSeconds = R.pipe(String, R.dropLast(1), R.divide(R.__, 100));

// TODO: Fix roundings issues. ex: [0.51, 0.5, 0.48, 0.38, 0.35] -> 0.46 but should be 0.45
const secondsToTime = (time) => {
  if (time === Infinity) {
    return 'DNF';
  }

  const min = Math.floor(time / 60);
  let s = (time - min * 60).toFixed(2);
  if (min > 0 && s.length === 4) {
    s = '0' + s;
  }

  return `${min ? min + ':' : ''}${s}`;
};

const averageOfFiveCalculator = R.ifElse(
  R.pipe(R.filter(R.lt(0)), R.length, R.equals(5)),
  R.pipe(
    R.sort(R.subtract),
    R.slice(1, -1),
    R.sum,
    R.divide(R.__, 3),
    (x) => x.toFixed(2),
    Number
  ),
  R.always(-Infinity)
);

export {
  secondsToTime,
  parseTimesArray,
  applyPenality,
  averageOfFiveCalculator,
  msToSeconds,
};
