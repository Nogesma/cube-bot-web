<script lang="ts">
  import { scrambleString } from "../stores/scrambles.js";
  import { scrambleSize } from "../stores/settings.js";
</script>

<div class="flex justify-center">
<div
  class="font-mono"
  style="font-size: {$scrambleSize}px; white-space: pre-line;"
>
  {$scrambleString}
</div>
</div>
