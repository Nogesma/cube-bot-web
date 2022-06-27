import { parseTimesArray } from "./calculator.js";
import axios from "axios";

const submitEvent = async (timesArray: {
  event: string;
  solves: number[][];
}) => {
  const { event, solves } = timesArray;
  const times = parseTimesArray(solves);

  return axios
    .post(
      `http://localhost:3000/api/times`,
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
