import * as R from 'ramda';
import { get } from 'svelte/store';
import {
  cubeDefaultColourScheme,
  pyraDefaultColourScheme,
  megaDefaultColourScheme,
  sq1DefaultColourScheme,
} from '../data/config';
import {
  cubeColourScheme,
  megaColourScheme,
  pyraColourScheme,
  sq1ColourScheme,
} from '../stores/settings';

const applyColourScheme = (svgString, defaultColourScheme, colourScheme) => {
  let finalSvgString = svgString;
  R.forEachObjIndexed(
    (value, key) =>
      (finalSvgString = R.replace(
        new RegExp(value, 'gi'),
        R.prop(key, colourScheme),
        finalSvgString
      )),
    defaultColourScheme
  );
  return finalSvgString;
};

const convertCube = (_, svgString) =>
  applyColourScheme(svgString, cubeDefaultColourScheme, get(cubeColourScheme));
const convertPyra = (_, svgString) =>
  applyColourScheme(svgString, pyraDefaultColourScheme, get(pyraColourScheme));

const convertMega = (_, svgString) =>
  applyColourScheme(svgString, megaDefaultColourScheme, get(megaColourScheme));

const convertSq1 = (_, svgString) =>
  applyColourScheme(svgString, sq1DefaultColourScheme, get(sq1ColourScheme));

const convertSvgColourScheme = R.cond([
  [R.equals('PYRA'), convertPyra],
  [R.equals('MEGA'), convertMega],
  [R.equals('SQ1'), convertSq1],
  [R.T, convertCube],
]);

export { convertSvgColourScheme };
