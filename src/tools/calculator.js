import * as R from 'ramda';

const applyPenality = R.cond([
  [R.pipe(R.last, R.equals(2)), R.always(Infinity)],
  [R.pipe(R.last, R.equals(1)), R.pipe(R.head, R.add(2))],
  [R.pipe(R.last, R.equals(0)), R.head],
]);

const parseTimesArray = R.map(applyPenality);

const msToSeconds = R.pipe(String, R.dropLast(1), R.divide(R.__, 100));

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

const timeToSeconds = (time) => {
  if (time === 'DNF') {
    return Infinity;
  }

  return Number(
    R.head(
      R.match(
        /\d+(\.\d{1,2})?/g,
        String(
          R.reduce((acc, t) => 60 * acc + Number(t), 0, R.split(':', time))
        )
      )
    )
  );
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
  timeToSeconds,
  parseTimesArray,
  applyPenality,
  averageOfFiveCalculator,
  msToSeconds,
};
