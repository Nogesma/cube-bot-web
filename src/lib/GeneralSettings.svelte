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

<div class="row">
  <h1 id="general">Général</h1>
</div>
<div class="row">
  <div class="col">
    <li>
      <div class="col form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="displayScrambles"
          bind:checked={$displayScrambles}
        />
        <label class="form-check-label" for="displayScrambles"
          >Afficher les mélanges
        </label>
      </div>
      <ul>
        <li>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="disableBlind"
              disabled={!$displayScrambles}
              bind:checked={$disableScramblesDisplayForBlind}
            />
            <label class="form-check-label" for="disableBlind"
              >Ne pas afficher pour le blind
            </label>
          </div>
        </li>
      </ul>
    </li>
    <div class="col input-group">
      <span class="input-group-text">Taille des mélanges</span>
      <input
        type="number"
        class="form-control"
        min="1"
        bind:value={$scrambleSize}
      />
    </div>
    <div class="col form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id="useInspection"
        bind:checked={$useInspection}
      />
      <label class="form-check-label" for="useInspection"
        >Activer l'inspection</label
      >
    </div>
    <li>
      <div class="col form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="timerUpdate"
          bind:checked={$timerUpdate}
        />
        <label class="form-check-label" for="timerUpdate"
          >Activer l'actualisation du chronomètre</label
        >
      </div>
      <ul>
        <div class="col input-group">
          <span class="input-group-text">Texte du chronomètre</span>
          <input
            type="text"
            class="form-control"
            disabled={$timerUpdate}
            bind:value={$runningTimerText}
          />
        </div>
      </ul>
    </li>
    <!--    <div class="input-group mt-3 mb-3">-->
    <!--      <label class="input-group-text text-muted" for="inputGroupSelect01"-->
    <!--        >Theme</label-->
    <!--      >-->
    <!--      <select class="form-select" id="inputGroupSelect01" disabled>-->
    <!--        <option value="1">Auto (use system theme)</option>-->
    <!--        <option selected value="2">Light</option>-->
    <!--        <option value="3">Dark</option>-->
    <!--      </select>-->
    <!--    </div>-->
  </div>
</div>

<style>
  li {
    list-style: none;
  }
</style>
