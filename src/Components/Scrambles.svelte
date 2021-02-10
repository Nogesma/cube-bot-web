<script>
  import { scrambleString } from '../stores/scrambles';
  import { scrambleSize } from '../stores/settings';
</script>

<div class="row">
  <div class="col-12 text-center">
    <p
      class="font-monospace"
      style="font-size: {$scrambleSize}px; white-space: pre-line;"
    >
      {$scrambleString}
    </p>
  </div>
</div>
