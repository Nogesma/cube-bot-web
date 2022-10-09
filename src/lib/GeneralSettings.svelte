<script lang="ts">
  import {
    displayScrambles,
    disableScramblesDisplayForBlind,
    scrambleSize,
    useInspection,
    timerUpdate,
    runningTimerText,
  } from "../stores/settings.js";

  $: theme = localStorage.theme ?? "auto";

  $: {
    console.log(theme);
    if (theme === "auto") localStorage.removeItem("theme");
    else localStorage.theme = theme;
  }
</script>

<div class="flex flex-col items-center">
  <div class="text-5xl">Général</div>

  <div class="flex flex-col w-full lg:flex-row m-5">
    <div class="grid flex-grow place-items-center p-5">
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
    <div class="grid flex-grow place-items-center p-5">
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
  <div class="form-control">
    <label class="input-group">
      <span>Theme</span>
      <select bind:value={theme} class="select select-bordered w-full max-w-xs">
        <option value="auto">Auto</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </label>
  </div>
</div>
