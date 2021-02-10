<script>
  import {
    displayScrambles,
    disableScramblesDisplayForBlind,
    scrambleSize,
  } from '../stores/settings';
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
    <!--      <div class="col form-check form-switch">-->
    <!--      <input-->
    <!--        class="form-check-input"-->
    <!--        type="checkbox"-->
    <!--        id="useInspection"-->
    <!--        checked={useInspection}-->
    <!--        disabled-->
    <!--      />-->
    <!--      <label class="form-check-label" for="useInspection">Use Inspection</label>-->
    <!--    </div>-->
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
