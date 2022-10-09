<script lang="ts">
  import * as R from "ramda";
  import {
    cubeColourScheme,
    megaColourScheme,
    pyraColourScheme,
    sq1ColourScheme,
  } from "../stores/settings.js";

  import { convertSvgColourScheme } from "../tools/colourScheme.js";
  import { getDefaultSvgString } from "../data/defaultSvg.js";

  let cubeSvg: string;
  let pyraSvg: string;
  let megaSvg: string;
  let sq1Svg: string;

  $: {
    $cubeColourScheme;
    cubeSvg = convertSvgColourScheme("333", getDefaultSvgString("333"));
  }

  $: {
    $pyraColourScheme;
    pyraSvg = convertSvgColourScheme("PYRA", getDefaultSvgString("PYRA"));
  }

  $: {
    $megaColourScheme;
    megaSvg = convertSvgColourScheme("MEGA", getDefaultSvgString("MEGA"));
  }

  $: {
    $sq1ColourScheme;
    sq1Svg = convertSvgColourScheme("SQ1", getDefaultSvgString("SQ1"));
  }
</script>

<div>
  <div class="text-5xl text-center">Colour Schemes</div>

  <div class="flex flex-col gap-5 w-full">
    <h2>Cubes:</h2>
    <div class="flex flex-row flex-auto justify-evenly">
      <div class="flex flex-col flex-auto gap-2 max-w-md">
        {#each R.keys($cubeColourScheme) as key}
          <label class="input-group">
            <span class="w-14 justify-center">{key}</span>
            <input
              class="input p-0 m-0"
              type="color"
              bind:value={$cubeColourScheme[key]}
            />
            <input
              class="input input-bordered flex-grow"
              type="text"
              bind:value={$cubeColourScheme[key]}
            />
          </label>
        {/each}
        <button class="btn" on:click={cubeColourScheme.reset}
          >Réinitialiser
        </button>
      </div>
      <div class="flex flex-auto max-h-96">
        {@html cubeSvg}
      </div>
    </div>
    <h2 id="pyra">Pyraminx:</h2>
    <div class="flex flex-row flex-auto">
      <div class="flex flex-col flex-auto gap-2 max-w-md">
        {#each R.keys($pyraColourScheme) as key}
          <label class="input-group">
            <span class="w-14 justify-center">{key}</span>
            <input
              class="input p-0 m-0"
              type="color"
              bind:value={$pyraColourScheme[key]}
            />
            <input
              class="input input-bordered flex-grow"
              type="text"
              bind:value={$pyraColourScheme[key]}
            />
          </label>
        {/each}
        <button class="btn" on:click={pyraColourScheme.reset}
          >Réinitialiser
        </button>
      </div>
      <div class="flex flex-auto max-h-96">
        {@html pyraSvg}
      </div>
    </div>
    <h2 id="mega">Megaminx:</h2>
    <div class="flex flex-row flex-auto">
      <div class="flex flex-col flex-auto gap-2 max-w-md">
        {#each R.keys($megaColourScheme) as key}
          <label class="input-group">
            <span class="w-14 justify-center">{key}</span>
            <input
              class="input p-0 m-0"
              type="color"
              bind:value={$megaColourScheme[key]}
            />
            <input
              class="input input-bordered flex-grow"
              type="text"
              bind:value={$megaColourScheme[key]}
            />
          </label>
        {/each}
        <button class="btn" on:click={megaColourScheme.reset}
          >Réinitialiser
        </button>
      </div>
      <div class="flex flex-auto max-h-96">
        {@html megaSvg}
      </div>
    </div>
    <h2 id="sq1">Square-1:</h2>
    <div class="flex flex-row flex-auto">
      <div class="flex flex-col flex-auto gap-2 max-w-md">
        {#each R.keys($sq1ColourScheme) as key}
          <label class="input-group">
            <span class="w-14 justify-center">{key}</span>
            <input
              class="input p-0 m-0"
              type="color"
              bind:value={$sq1ColourScheme[key]}
            />
            <input
              class="input input-bordered flex-grow"
              type="text"
              bind:value={$sq1ColourScheme[key]}
            />
          </label>
        {/each}
        <button class="btn" on:click={sq1ColourScheme.reset}
          >Réinitialiser
        </button>
      </div>
      <div class="flex flex-auto max-h-96">
        {@html sq1Svg}
      </div>
    </div>
  </div>
</div>
