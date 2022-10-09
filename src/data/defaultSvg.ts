import { getSvg } from "../stores/scrambles.js";
import pyra from "../assets/pyra.svg";
import mega from "../assets/mega.svg";
import sq1 from "../assets/sq1.svg";
import axios from "axios";
import {
  always,
  cond,
  equals,
  forEachObjIndexed,
  memoizeWith,
  pipe,
  replace,
  T,
} from "ramda";
import type { ColourScheme } from "./config";
import {
  cubeDefaultColourScheme,
  megaDefaultColourScheme,
  pyraDefaultColourScheme,
  sq1DefaultColourScheme,
} from "./config";

const cubeDefaultSvgString = getSvg("333", "");

const pyraDefaultSvgString: string = await axios
  .get(pyra)
  .then(({ data }) => data)
  .catch(() => "");

const megaDefaultSvgString: string = await axios
  .get(mega)
  .then(({ data }) => data)
  .catch(() => "");

const sq1DefaultSvgString: string = await axios
  .get(sq1)
  .then(({ data }) => data)
  .catch(() => "");

const applyPrefix = ({
  svgString,
  colourScheme,
}: {
  svgString: string;
  colourScheme: ColourScheme;
}) => {
  if (!svgString) return "";
  let finalSvgString = svgString;
  forEachObjIndexed(
    (value) =>
      (finalSvgString = replace(
        new RegExp(value, "gi"),
        `dc-${value}`,
        finalSvgString
      )),
    colourScheme
  );
  return finalSvgString;
};

const getDefaultSvgString = memoizeWith<(event: string) => string>(
  String,
  pipe(
    cond([
      [
        equals("PYRA"),
        always({
          svgString: pyraDefaultSvgString,
          colourScheme: pyraDefaultColourScheme,
        }),
      ],
      [
        equals("MEGA"),
        always({
          svgString: megaDefaultSvgString,
          colourScheme: megaDefaultColourScheme,
        }),
      ],
      [
        equals("SQ1"),
        always({
          svgString: sq1DefaultSvgString,
          colourScheme: sq1DefaultColourScheme,
        }),
      ],
      [
        T,
        always({
          svgString: cubeDefaultSvgString,
          colourScheme: cubeDefaultColourScheme,
        }),
      ],
    ]),
    applyPrefix
  )
);

export { getDefaultSvgString };
