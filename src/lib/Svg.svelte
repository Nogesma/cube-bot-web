<script lang="ts">
  import { scrambleString, svg, getSvg } from "../stores/scrambles.js";
  import { includes } from "ramda";
  import { convertSvgColourScheme } from "../tools/colourScheme.js";
  import { currentEvent } from "../stores/times.js";
</script>

<div class="flex flex-shrink flex-grow-0 h-1/2 justify-start content-start">
  {#if includes($currentEvent, ["333", "222", "OH", "3BLD", "444", "555"])}
    {#await getSvg($currentEvent, $scrambleString) then s}
      {@html convertSvgColourScheme($currentEvent, s)}
    {/await}
  {:else}
    {@html $svg}
  {/if}
</div>
