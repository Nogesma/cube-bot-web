<script lang="ts">
  import ColourSchemes from "../lib/ColourSchemes.svelte";
  import GeneralSettings from "../lib/GeneralSettings.svelte";
</script>

<div class="flex flex-col w-full">
  <div class="grid card bg-base-300 rounded-box place-items-center p-5">
    <GeneralSettings />
  </div>
  <div class="divider" />
  <div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
    <ColourSchemes />
  </div>
</div>
