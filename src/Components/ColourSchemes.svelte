<script>
  import * as R from 'ramda';
  import {
    cubeColourScheme,
    pyraColourScheme,
    megaColourScheme,
    sq1ColourScheme,
  } from '../stores/settings';
  import {
    cubeDefaultSvgString,
    pyraDefaultSvgString,
    megaDefaultSvgString,
    sq1DefaultSvgString,
  } from '../data/defaultSvg';

  import { convertSvgColourScheme } from '../tools/colourScheme';
</script>

<div class="row">
  <h1 id="colour">Colour Schemes</h1>
</div>
<div class="row">
  <div class="col">
    <h2 id="cube">Cubes:</h2>
  </div>
  <div class="row">
    <div class="col-3">
      <div class="input-group">
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
      </div>
    </div>
    <div class="col-8 text-center">
      {#await cubeDefaultSvgString then svg}
        {@html convertSvgColourScheme('333', svg, $cubeColourScheme)}
      {/await}
    </div>
    <div class="col-1">
      <button class="btn btn-outline-dark" on:click={cubeColourScheme.reset}
        >Réinitialiser
      </button>
    </div>
  </div>
</div>
<div class="row">
  <div class="col">
    <h2 id="pyra">Pyraminx:</h2>
  </div>
  <div class="row">
    <div class="col-3">
      <div class="input-group">
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
      </div>
    </div>
    <div class="col-8 text-center">
      {@html convertSvgColourScheme(
        'PYRA',
        pyraDefaultSvgString,
        $pyraColourScheme
      )}
    </div>
    <div class="col-1">
      <button class="btn btn-outline-dark" on:click={pyraColourScheme.reset}
        >Réinitialiser
      </button>
    </div>
  </div>
</div>
<div class="row">
  <div class="col">
    <h2 id="mega">Megaminx:</h2>
  </div>
  <div class="row">
    <div class="col-3">
      <div class="input-group">
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
      </div>
    </div>
    <div class="col-8 text-center">
      {@html convertSvgColourScheme(
        'MEGA',
        megaDefaultSvgString,
        $megaColourScheme
      )}
    </div>
    <div class="col-1">
      <button class="btn btn-outline-dark" on:click={megaColourScheme.reset}
        >Réinitialiser
      </button>
    </div>
  </div>
</div>
<div class="row">
  <div class="col">
    <h2 id="sq1">Square-1:</h2>
  </div>
  <div class="row">
    <div class="col-3">
      <div class="input-group">
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
      </div>
    </div>
    <div class="col-8 text-center">
      {@html convertSvgColourScheme(
        'SQ1',
        sq1DefaultSvgString,
        $sq1ColourScheme
      )}
    </div>
    <div class="col-1">
      <button class="btn btn-outline-dark" on:click={sq1ColourScheme.reset}
        >Réinitialiser
      </button>
    </div>
  </div>
</div>

<style>
  h2 {
    padding-top: 1.5rem;
    padding-bottom: 0.75rem;
  }
</style>
