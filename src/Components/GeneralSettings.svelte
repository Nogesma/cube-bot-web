<script>
  import {
    displayScrambles,
    disableScramblesDisplayForBlind,
  } from '../stores/settings';

  let useInspection = false;
</script>

<style>
  li {
    list-style: none;
  }
</style>

<div class="row">
  <h1 id="general">General</h1>
</div>
<div class="row">
  <div class="col">
    <li>
      <div class="col form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="displayScrambles"
          bind:checked={$displayScrambles} />
        <label class="form-check-label" for="displayScrambles">Display Scrambles
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
              bind:checked={$disableScramblesDisplayForBlind} />
            <label class="form-check-label" for="disableBlind">Disable for blind
            </label>
          </div>
        </li>
      </ul>
      <div class="col form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          id="useInspection"
          checked={useInspection}
          disabled />
        <label class="form-check-label" for="useInspection">Use Inspection</label>
      </div>
    </li>
    <div class="input-group mt-3 mb-3">
      <label
        class="input-group-text text-muted"
        for="inputGroupSelect01">Theme</label>
      <select class="form-select" id="inputGroupSelect01" disabled>
        <option value="1">Auto (use system theme)</option>
        <option selected value="2">Light</option>
        <option value="3">Dark</option>
      </select>
    </div>
  </div>
</div>
