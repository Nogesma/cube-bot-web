<script lang="ts">
  import {
    displayScrambles,
    disableScramblesDisplayForBlind,
    scrambleSize,
    useInspection,
    timerUpdate,
    runningTimerText,
  } from "../stores/settings.js";
</script>

<div class="text-5xl">Général</div>

<div class="flex flex-col w-full lg:flex-row m-5">
  <div
    class="grid flex-grow card bg-base-100 rounded-box place-items-center p-5"
  >
    <div class="flex justify-center flex-col content-evenly">
      <label class="label cursor-pointer">
        <span class="label-text">Afficher les melanges</span>
        <input
          type="checkbox"
          class="checkbox checkbox-primary"
          bind:checked={$displayScrambles}
        />
      </label>

      <label class="label cursor-pointer">
        <span class="label-text">Ne pas afficher pour le blind</span>
        <input
          type="checkbox"
          class="checkbox checkbox-primary"
          disabled={!$displayScrambles}
          bind:checked={$disableScramblesDisplayForBlind}
        />
      </label>

      <div class="form-control">
        <label class="input-group">
          <span>Taille des melanges</span>
          <input
            type="number"
            min="1"
            class="input input-bordered"
            bind:value={$scrambleSize}
          />
        </label>
      </div>
    </div>
  </div>
  <div class="divider lg:divider-horizontal" />
  <div
    class="grid flex-grow card rounded-box place-items-center p-5 bg-base-100"
  >
    <div class="flex justify-center flex-col content-evenly">
      <label class="label cursor-pointer">
        <span class="label-text">Activer l'inspection</span>
        <input
          type="checkbox"
          class="checkbox checkbox-primary"
          bind:checked={$useInspection}
        />
      </label>

      <label class="label cursor-pointer">
        <span class="label-text">Activer l'actualisation du chronomètre</span>
        <input
          class="form-check-input checkbox checkbox-primary"
          type="checkbox"
          bind:checked={$timerUpdate}
        />
      </label>

      <div class="form-control">
        <label class="input-group">
          <span>Texte du chronomètre</span>
          <input
            type="text"
            class="input input-bordered"
            disabled={$timerUpdate}
            bind:value={$runningTimerText}
          />
        </label>
      </div>
    </div>
  </div>
</div>
