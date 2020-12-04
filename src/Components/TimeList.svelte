<script>
  // TODO: Time input in s over 60, ex: 65.10
  // TODO: Time input validation on enter
  import * as R from 'ramda';
  import { onMount } from 'svelte';

  import {
    applyPenality,
    msToSeconds,
    secondsToTime,
  } from '../tools/calculator';
  import { submitEvent } from '../tools/submitTimes';

  import { currentEvent, times } from '../stores/times';

  $: eventIndex = R.findIndex(R.propEq('event')($currentEvent))($times);
  $: solvesLens = R.lensPath([eventIndex, 'solves']);
  $: solves = R.view(solvesLens, $times);

  const newTime = (time) =>
    times.update(R.over(solvesLens, R.append([time, 0])));

  const addTime = () => newTime(msToSeconds(inputTime)) && (inputTime = '');

  const deleteLastTime = () => times.update(R.over(solvesLens, R.dropLast(1)));

  const updatePenality = (i, a) => {
    times.update((t) =>
      R.over(solvesLens, (x) => R.update(i, [x[i][0], a], x), t)
    );
  };

  const modifyTime = (i, j) => (times[i].solves[j] = [inputTime, 0]);

  let inputTime = '';
  $: isValidInput = R.test(/^(?:([0-5]?\d):)?[0-5]?\d(\.\d+)?$/, inputTime);

  let isModalShown;

  onMount(() => {
    const modal = document.getElementById('submitTimesConfirmation');
    modal.addEventListener('hide.bs.modal', () => (isModalShown = false));
    modal.addEventListener('show.bs.modal', () => (isModalShown = true));
  });
</script>

<div class="row">
  <div class="col-12">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Time</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>
        {#each R.times(R.identity, 5) as i}
          <tr>
            <th scope="row">{i + 1}</th>
            {#if R.nth(i, solves)}
              <td>
                {R.pipe(R.nth, applyPenality, secondsToTime)(i, solves) + (solves[i][1] === 1 ? '+' : '')}
              </td>
              <td>
                <div class="btn-group" role="group">
                  {#each ['OK', '+2', 'DNF'] as penality, p}
                    <button
                      class="btn btn-outline-dark btn-sm pb-0 pt-0 {solves[i][1] === p ? 'active' : ''}"
                      on:click={() => updatePenality(i, p)}>{penality}</button>
                  {/each}
                  <!-- <button
                    class="btn btn-outline-dark btn-sm pb-0 pt-0"
                    data-toggle="modal"
                    data-target="#addTimeModal"><svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-pencil-square"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg></button> -->
                  {#if R.equals(i + 1, R.length(solves))}
                    <button
                      class="btn btn-outline-dark btn-sm pb-0 pt-0"
                      on:click={deleteLastTime}>X</button>
                  {/if}
                </div>
              </td>
            {:else}
              <td />
              <td />
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
<div class="row">
  <div class="col-12 p-2">
    <button
      class="btn btn-outline-dark btn-sm {R.equals(5, R.length(solves)) ? 'disabled' : ''}"
      data-toggle="modal"
      data-target="#addTimeModal">Add time</button>
    <button
      class="btn btn-outline-dark btn-sm {R.equals(5, R.length(solves)) ? '' : 'disabled'}"
      data-toggle="modal"
      data-target="#submitTimesConfirmation">Submit times</button>
  </div>
</div>

<div class="modal fade" id="addTimeModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Enter time</h5>
        <button type="button" class="btn-close" data-dismiss="modal" />
      </div>
      <div class="modal-body">
        <div class="input-group mb-3">
          <input
            type="text"
            bind:value={inputTime}
            class="form-control"
            placeholder="1:23.456" />
        </div>
      </div>
      <div class="modal-footer pt-1 pb-1">
        {#if isValidInput}
          <button
            type="button"
            class="btn btn-dark"
            data-dismiss="modal"
            on:click={addTime}>Save</button>
        {:else}
          <button type="button" class="btn btn-dark disabled">Save</button>
        {/if}
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="submitTimesConfirmation" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Résultats</h5>
        <button
          type="button"
          class="btn-close"
          data-dismiss="modal"
          aria-label="Close" />
      </div>
      <div class="modal-body">
        {#if isModalShown}
          {#await submitEvent($times[eventIndex])}
            ...
          {:then response}
            {response}
          {/await}
        {/if}
      </div>
      <div class="modal-footer pt-1 pb-1">
        <button
          type="button"
          class="btn btn-dark"
          data-dismiss="modal">Ok</button>
      </div>
    </div>
  </div>
</div>
