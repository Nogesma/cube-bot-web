<script>
  import { scrambleString, svg } from '../stores/scrambles';
  import * as wasm from 'scr-to-svg';
  import { currentEvent } from '../stores/times';
  import { includes } from 'ramda';
  import { convertSvgColourScheme } from '../tools/colourScheme';

  const getSvg = async (e, s) => {
    if (typeof getSvg.is_init === 'undefined') {
      await wasm.default();
      getSvg.is_init = 0;
    }

    if (s === 'Chargement des mélanges...') return '';
    return convertSvgColourScheme(e, wasm.get_scramble_svg(e, s));
  };
</script>

<div class="row">
  <div class="col h-100">
    {#if includes($currentEvent, ['333', '222', 'OH'])}
      {#await getSvg($currentEvent, $scrambleString) then s}
        {@html s}
      {/await}
    {:else}
      {@html $svg}
    {/if}
  </div>
</div>
