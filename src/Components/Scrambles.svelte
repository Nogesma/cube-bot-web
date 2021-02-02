<script>
  import { scrambleString } from '../stores/scrambles';
</script>

<div class="row">
  <div class="col-12 text-center">
    <p class="font-monospace scrambleFont">{$scrambleString}</p>
  </div>
</div>

<style>
  .scrambleFont {
    font-size: 2vmax;
  }
</style>
