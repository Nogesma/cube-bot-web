import type { ColourScheme } from "../tools/colourScheme";

const pages = {
  Dashboard: "Dashboard",
  Timer: "Timer",
  Settings: "Settings",
  Rankings: "Rankings",
};

const events = [
  "333",
  "222",
  "444",
  "555",
  "3BLD",
  "OH",
  "SQ1",
  "MEGA",
  "PYRA",
  "CLOCK",
  "SKEWB",
];

const cubeDefaultColourScheme: ColourScheme = {
  U: "#ffffff",
  R: "#ff0000",
  F: "#00ff00",
  L: "#ff8000",
  B: "#0000ff",
  D: "#ffff00",
};

const pyraDefaultColourScheme: ColourScheme = {
  R: "#ff0000",
  F: "#00ff00",
  L: "#0000ff",
  D: "#ffff00",
};

const sq1DefaultColourScheme: ColourScheme = {
  U: "#ffff00",
  R: "#00ff00",
  F: "#ff0000",
  L: "#0000ff",
  B: "#ff8000",
  D: "#ffffff",
};

const megaDefaultColourScheme: ColourScheme = {
  U: "#ffffff",
  R: "#dd0000",
  F: "#006600",
  L: "#8a1aff",
  Ubr: "#0000b3",
  Ubl: "#ffcc00",
  Fr: "#ffffb3",
  Fl: "#88ddff",
  Br: "#ff99ff",
  Bl: "#ff8433",
  B: "#71e600",
  D: "#999999",
};

export {
  pages,
  events,
  cubeDefaultColourScheme,
  pyraDefaultColourScheme,
  sq1DefaultColourScheme,
  megaDefaultColourScheme,
};
