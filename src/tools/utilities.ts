import * as R from "ramda";
import { timeToSeconds } from "./calculator.js";

const getAvatarUrl = (avatar: string, id: string) =>
  `https://cdn.discordapp.com/${
    R.equals(1, R.length(avatar))
      ? `embed/avatars/${avatar}`
      : `avatars/${id}/${avatar}`
  }${R.test(/^a_/, avatar) ? ".gif" : ".png"}`;

const addParenthesis = (solve: string) => `(${solve})`;

const formatSolvesArray = (solves: string[]) => {
  const numArray = R.map(timeToSeconds, solves);
  return R.pipe(
    R.adjust(R.indexOf(Math.min(...numArray), numArray), addParenthesis),
    R.adjust(R.indexOf(Math.max(...numArray), numArray), addParenthesis)
  )(solves);
};

export { getAvatarUrl, formatSolvesArray };
