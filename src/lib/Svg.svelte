<script lang="ts">
  import { scrambleString, svg, getSvg } from "../stores/scrambles.js";
  import { includes } from "ramda";
  import { convertSvgColourScheme } from "../tools/colourScheme.js";
  import { currentEvent } from "../stores/times.js";
</script>

<div class="max-h-96">
  {#if includes( $currentEvent, ["333", "222", "OH", "3BLD", "444", "555", "MEGA"] )}
    {@html convertSvgColourScheme(
      $currentEvent,
      getSvg($currentEvent, $scrambleString)
    )}
  {:else}
    {@html $svg}
  {/if}
</div>
