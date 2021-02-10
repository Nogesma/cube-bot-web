import * as R from 'ramda';
import { timeToSeconds } from './calculator';

const getAvatarUrl = (avatar, id) =>
  `https://cdn.discordapp.com/${
    R.equals(1, R.length(avatar))
      ? `embed/avatars/${avatar}`
      : `avatars/${id}/${avatar}`
  }${R.test(/^a_/, avatar) ? '.gif' : '.png'}`;

const addParenthesis = (solve) => `(${solve})`;

const formatSolvesArray = (solves) => {
  const numArray = R.map(timeToSeconds, solves);
  return R.pipe(
    R.adjust(R.indexOf(Math.min(...numArray), numArray), addParenthesis),
    R.adjust(R.indexOf(Math.max(...numArray), numArray), addParenthesis)
  )(solves);
};

export { getAvatarUrl, formatSolvesArray };
