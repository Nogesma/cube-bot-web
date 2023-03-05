import { getSvg } from "../stores/scrambles.js";
import pyra from "../assets/pyra.svg";
import sq1 from "../assets/sq1.svg";
import axios from "axios";
import { always, cond, equals, memoizeWith, T } from "ramda";

const cubeDefaultSvgString = getSvg("333", "");

const pyraDefaultSvgString: string = await axios
  .get(pyra)
  .then(({ data }) => data)
  .catch(() => "");

const megaDefaultSvgString = getSvg("MEGA", "");

const sq1DefaultSvgString: string = await axios
  .get(sq1)
  .then(({ data }) => data)
  .catch(() => "");

const getDefaultSvgString = memoizeWith<(event: string) => string>(
  String,
  cond([
    [equals("PYRA"), always(pyraDefaultSvgString)],
    [equals("MEGA"), always(megaDefaultSvgString)],
    [equals("SQ1"), always(sq1DefaultSvgString)],
    [T, always(cubeDefaultSvgString)],
  ])
);

export { getDefaultSvgString };
