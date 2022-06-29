<script lang="ts">
  import { scrambleString, svg, getSvg } from "../stores/scrambles.js";
  import { includes } from "ramda";
  import { convertSvgColourScheme } from "../tools/colourScheme.js";
  import { currentEvent } from "../stores/times.js";
</script>

<div
  class="flex flex-grow-0 {$currentEvent === 'MEGA'
    ? 'w-4/6'
    : 'lg:w-1/3'} max-h-full"
  style="height: 56rem"
>
  {#if includes($currentEvent, ["333", "222", "OH", "3BLD", "444", "555"])}
    {@html convertSvgColourScheme(
      $currentEvent,
      getSvg($currentEvent, $scrambleString)
    )}
  {:else}
    {@html $svg}
  {/if}
</div>
