import { getSvg } from "../stores/scrambles.js";
import pyra from "../assets/pyra.svg";
import mega from "../assets/mega.svg";
import sq1 from "../assets/sq1.svg";
import axios from "axios";

const cubeDefaultSvgString = getSvg("333", "");

const pyraDefaultSvgString = await axios
  .get(pyra)
  .then(({ data }) => data)
  .catch(() => "");

const megaDefaultSvgString = await axios
  .get(mega)
  .then(({ data }) => data)
  .catch(() => "");

const sq1DefaultSvgString = await axios
  .get(sq1)
  .then(({ data }) => data)
  .catch(() => "");

export {
  cubeDefaultSvgString,
  pyraDefaultSvgString,
  megaDefaultSvgString,
  sq1DefaultSvgString,
};
