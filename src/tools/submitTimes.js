import { parseTimesArray } from './calculator';

const submitEvent = (timesArray) => {
  const { event, solves } = timesArray;
  const times = parseTimesArray(solves);

  return fetch(`/api/times`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event, solves: times }),
  })
    .then((res) => res.json())
    .then(({ result }) => {
      return result;
    });
};

export { submitEvent };
