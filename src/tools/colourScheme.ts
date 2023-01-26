import * as R from "ramda";
import { get } from "svelte/store";

import {
  cubeDefaultColourScheme,
  pyraDefaultColourScheme,
  megaDefaultColourScheme,
  sq1DefaultColourScheme,
  type ColourScheme,
} from "../data/config";
import {
  cubeColourScheme,
  megaColourScheme,
  pyraColourScheme,
  sq1ColourScheme,
} from "../stores/settings";
import { forEachObjIndexed, replace } from "ramda";

const getHtmlColour = (colour: string) => {
  const s = new Option().style;
  s.color = colour;
  return s.color === "" ? "#000000" : colour;
};

const applyPrefix = (svgString: string, colourScheme: ColourScheme) => {
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

const applyColourScheme = (
  svgString: string | undefined,
  defaultColourScheme: ColourScheme,
  colourScheme: ColourScheme
) => {
  if (!svgString) return "";
  let finalSvgString = svgString;
  R.forEachObjIndexed(
    (value, key) =>
      (finalSvgString = R.replace(
        new RegExp(`dc-${value}`, "gi"),
        getHtmlColour(R.prop(key, colourScheme)),
        finalSvgString
      )),
    defaultColourScheme
  );
  return finalSvgString;
};

const convertCube = (_: string, svgString: string) =>
  applyColourScheme(
    applyPrefix(svgString, cubeDefaultColourScheme),
    cubeDefaultColourScheme,
    get(cubeColourScheme)
  );

const convertPyra = (_: string, svgString: string) =>
  applyColourScheme(
    applyPrefix(svgString, pyraDefaultColourScheme),
    pyraDefaultColourScheme,
    get(pyraColourScheme)
  );

const convertMega = (_: string, svgString: string) =>
  applyColourScheme(
    applyPrefix(svgString, megaDefaultColourScheme),
    megaDefaultColourScheme,
    get(megaColourScheme)
  );

const convertSq1 = (_: string, svgString: string) =>
  applyColourScheme(
    applyPrefix(svgString, sq1DefaultColourScheme),
    sq1DefaultColourScheme,
    get(sq1ColourScheme)
  );

const convertSvgColourScheme = R.cond<[string, string], string>([
  [R.equals("PYRA"), convertPyra],
  [R.equals("MEGA"), convertMega],
  [R.equals("SQ1"), convertSq1],
  [R.T, convertCube],
]);

export { convertSvgColourScheme };
