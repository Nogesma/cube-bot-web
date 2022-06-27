<script lang="ts">
  import { scrambleString } from "../stores/scrambles.js";
  import { scrambleSize } from "../stores/settings.js";
</script>

<div
  class="font-monospace text-center container"
  style="font-size: {$scrambleSize}px; white-space: pre-line;"
>
  {$scrambleString}
</div>
