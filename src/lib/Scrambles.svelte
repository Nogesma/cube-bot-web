<script lang="ts">
  import { scrambleString } from "../stores/scrambles.js";
  import { currentEvent } from "../stores/times.js";
</script>

<div
  class="font-mono tracking-tight whitespace-pre-line p-2 {$currentEvent ===
  'MEGA'
    ? 'text-sm md:text-base xl:text-3xl'
    : 'text-xl text-center lg:text-3xl'}"
>
  {$scrambleString}
</div>
