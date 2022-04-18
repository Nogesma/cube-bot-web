<script>
  import { scrambleString, svg, getSvg } from '../stores/scrambles';
  import { currentEvent } from '../stores/times';
  import { includes } from 'ramda';
</script>

<div class="row">
  <div class="col h-100">
    {#if includes($currentEvent, ['333', '222', 'OH', '3BLD', '444', '555'])}
      {#await getSvg($currentEvent, $scrambleString) then s}
        {@html s}
      {/await}
    {:else}
      {@html $svg}
    {/if}
  </div>
</div>
