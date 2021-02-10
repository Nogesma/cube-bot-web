<script>
  import * as R from 'ramda';
  import dayjs from 'dayjs';
  import { events } from '../data/config';
  import { getAvatarUrl, formatSolvesArray } from '../tools/utilities';

  let rankEvent = '333';
  let dayOrMonth = 'day';
  let isDay = true;
  let stringDate = dayjs().format('YYYY-MM-DD');

  const fetchRankings = async () =>
    fetch(
      `/api/rankings/${dayOrMonth}/${rankEvent}/${formattedDate}/`
    ).then((res) => res.json());

  const handleSubmit = async () => {
    rankings = [];
    isDay = dayOrMonth === 'day';
    formattedDate = isDay ? date.format('YYYY-MM-DD') : date.format('YYYY-MM');
    rankings = await fetchRankings();
  };

  let rankings = [];
  $: date = dayjs(stringDate);
  $: isValidDate = date.isValid();
  let formattedDate;
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="container-xxl d-flex align-items-md-center">
    <div class="col">
      <div class="row mt-3 mb-3">
        <div class="col">
          <span
            class="position-relative mr-auto navbar-brand mb-0 h1"
            style="display: inline-block; direction: ltr;"
          >
            Classement {formattedDate ? `du ${formattedDate}` : ''}</span
          >
        </div>
        <div class="col">
          <select bind:value={dayOrMonth} class="form-select">
            <option selected value="day">Jour</option>
            <option value="month">Mois</option>
          </select>
        </div>
        <div class="col">
          <select bind:value={rankEvent} class="form-select">
            <option>Event</option>
            {#each events as e}
              <option value={e}>{e}</option>
            {/each}
          </select>
        </div>
        <div class="col">
          <div class="input-group">
            <span class="input-group-text">Date</span>
            <input
              type="date"
              id="dateInput"
              class="form-control"
              bind:value={stringDate}
              required
            />
          </div>
        </div>
        <div class="col">
          <button type="submit" class="btn btn-dark" disabled={!isValidDate}
            >Valider</button
          >
        </div>
      </div>
    </div>
  </div>
</form>

<div class="container-xxl my-md-4 bd-layout">
  <table class="table table-hover caption-top">
    {#if isDay}
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nom</th>
          <th scope="col">Ao5</th>
          <th scope="col">Single</th>
          <th scope="col" colspan="5">Solves</th>
        </tr>
      </thead>
      <tbody>
        {#each rankings as { author, solves, average, single, avatar, username }, i}
          <tr>
            <th scope="row">{i + 1}</th>
            <td class="col">
              <img
                src={getAvatarUrl(String(avatar), author)}
                alt="discord avatar"
                height="25px"
                class="rounded-circle"
              />
              {username}
            </td>
            <td class="col">{average}</td>
            <td class="col">{single}</td>
            {#each formatSolvesArray(solves) as s}
              <td class="col">{s}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    {:else}
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nom</th>
          <th scope="col">Points</th>
          <th scope="col">Participations</th>
        </tr>
      </thead>
      <tbody>
        {#each rankings as { author, score, attendances, avatar, username }, i}
          <tr>
            <th scope="row">{i + 1}</th>
            <td class="col">
              <img
                src={getAvatarUrl(String(avatar), author)}
                alt="discord avatar"
                height="25px"
                class="rounded-circle"
              />
              {username}
            </td>
            <td class="col">{score}</td>
            <td class="col">{attendances}</td>
          </tr>
        {/each}
      </tbody>
    {/if}
  </table>
</div>
