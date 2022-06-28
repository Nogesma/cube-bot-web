<script lang="ts">
  import * as R from "ramda";
  import {
    cubeColourScheme,
    megaColourScheme,
    pyraColourScheme,
    sq1ColourScheme,
  } from "../stores/settings.js";

  import { convertSvgColourScheme } from "../tools/colourScheme.js";
  import {
    cubeDefaultSvgString,
    megaDefaultSvgString,
    pyraDefaultSvgString,
    sq1DefaultSvgString,
  } from "../data/defaultSvg.js";
</script>

<div class="text-5xl">Colour Schemes</div>

<div class="flex justify-center flex-col content-evenly">
  <h2>Cubes:</h2>
  <div class="flex flex-row justify-evenly flex-wrap ">
    <div class="flex flex-col justify-self-start justify-evenly">
      {#each R.keys($cubeColourScheme) as key}
        <div class="input-group mb-3">
          <span class="input-group-text">{key}</span>
          <label class="input-group-text">
            <input type="color" bind:value={$cubeColourScheme[key]} />
          </label>
          <input
            type="text"
            class="form-control"
            bind:value={$cubeColourScheme[key]}
          />
        </div>
      {/each}
      <button class="btn" on:click={cubeColourScheme.reset}
        >Réinitialiser
      </button>
    </div>
    <div class="basis-1/5">
      {#await cubeDefaultSvgString then svg}
        {@html convertSvgColourScheme("333", svg, $cubeColourScheme)}
      {/await}
    </div>
  </div>
  <h2 id="pyra">Pyraminx:</h2>
  <div class="flex flex-row justify-evenly flex-wrap">
    <div class="flex flex-col justify-self-start justify-evenly">
      {#each R.keys($pyraColourScheme) as key}
        <div class="input-group mb-3">
          <span class="input-group-text">{key}</span>
          <span class="input-group-text"
            ><input type="color" bind:value={$pyraColourScheme[key]} /></span
          >
          <input
            type="text"
            class="form-control"
            bind:value={$pyraColourScheme[key]}
          />
        </div>
      {/each}
      <button class="btn" on:click={pyraColourScheme.reset}
        >Réinitialiser
      </button>
    </div>
    <div class="basis-1/6 basis">
      {@html convertSvgColourScheme(
        "PYRA",
        pyraDefaultSvgString,
        $pyraColourScheme
      )}
    </div>
  </div>
  <h2 id="mega">Megaminx:</h2>
  <div class="flex flex-row justify-evenly flex-wrap">
    <div class="flex flex-col justify-self-start justify-evenly">
      {#each R.keys($megaColourScheme) as key}
        <div class="input-group mb-3">
          <span class="input-group-text">{key}</span>
          <span class="input-group-text"
            ><input type="color" bind:value={$megaColourScheme[key]} /></span
          >
          <input
            type="text"
            class="form-control"
            bind:value={$megaColourScheme[key]}
          />
        </div>
      {/each}
      <button class="btn" on:click={megaColourScheme.reset}
        >Réinitialiser
      </button>
    </div>
    <div class="basis-1/3">
      {@html convertSvgColourScheme(
        "MEGA",
        megaDefaultSvgString,
        $megaColourScheme
      )}
    </div>
  </div>
  <h2 id="sq1">Square-1:</h2>
  <div class="flex flex-row justify-evenly flex-wrap">
    <div class="flex flex-col justify-self-start justify-evenly">
      {#each R.keys($sq1ColourScheme) as key}
        <div class="input-group mb-3">
          <span class="input-group-text">{key}</span>
          <span class="input-group-text"
            ><input type="color" bind:value={$sq1ColourScheme[key]} /></span
          >
          <input
            type="text"
            class="form-control"
            bind:value={$sq1ColourScheme[key]}
          />
        </div>
      {/each}
      <button class="btn" on:click={sq1ColourScheme.reset}
        >Réinitialiser
      </button>
    </div>
    <div class="basis-1/12">
      {@html convertSvgColourScheme(
        "SQ1",
        sq1DefaultSvgString,
        $sq1ColourScheme
      )}
    </div>
  </div>
</div>
