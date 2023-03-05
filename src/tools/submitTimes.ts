import { parseTimesArray } from "./calculator.js";
import axios from "axios";
import { map, toString } from "ramda";

const submitEvent = async (timesArray: {
  event: string;
  solves: number[][];
}) => {
  const { event, solves } = timesArray;
  const times = map(toString, parseTimesArray(solves));

  return axios
    .post(
      `${import.meta.env.VITE_BACKEND_URI}/api/times`,
      { event, solves: times },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(({ data }) => data.result)
    .catch((err) => err);
};

export { submitEvent };
