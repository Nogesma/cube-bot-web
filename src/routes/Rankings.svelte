<script lang="ts">
  import * as R from "ramda";
  import dayjs from "dayjs";
  import { events } from "../data/config.js";
  import { getAvatarUrl, formatSolvesArray } from "../tools/utilities.js";

  let rankEvent: string;
  let dayOrMonth: string;
  let isDay = true;
  let stringDate = dayjs().format("YYYY-MM-DD");

  const fetchRankings = async () =>
    fetch(`/api/rankings/${dayOrMonth}/${rankEvent}/${formattedDate}/`).then(
      (res) => res.json()
    );

  const handleSubmit = async () => {
    rankings = [];
    isDay = dayOrMonth === "day";
    formattedDate = isDay ? date.format("YYYY-MM-DD") : date.format("YYYY-MM");
    rankings = await fetchRankings();
  };

  let rankings: {
    author: string;
    solves: string[];
    score: string;
    attendances: string;
    average: string;
    single: string;
    avatar: string;
    username: string;
  }[] = [];
  $: date = dayjs(stringDate);
  $: isValidDate = date.isValid();
  $: isValidInput =
    rankEvent !== "Event" && dayOrMonth !== "Jour/Mois" && isValidDate;

  let formattedDate: string;
</script>

<div class="flex flex-col container mx-auto">
  <div class="flex flex-auto text-5xl justify-center">
    <span> Classement {formattedDate ? `du ${formattedDate}` : ""}</span>
  </div>
  <div class="flex py-10">
    <div class="flex flex-auto" />
    <div class="flex justify-center px-4">
      <select bind:value={dayOrMonth} class="select select-bordered">
        <option selected disabled>Jour/Mois</option>
        <option value="day">Jour</option>
        <option value="month">Mois</option>
      </select>
    </div>
    <div class="flex justify-center px-4">
      <select bind:value={rankEvent} class="select select-bordered">
        <option selected disabled>Event</option>
        {#each events as e}
          <option value={e}>{e}</option>
        {/each}
      </select>
    </div>
    <div class="flex px-4">
      <label class="input-group justify-center">
        <span>Date</span>
        <input
          type="date"
          id="dateInput"
          class="input input-bordered"
          bind:value={stringDate}
          required
        />
      </label>
    </div>
    <div class="flex justify-center px-4">
      <button on:click={handleSubmit} class="btn" disabled={!isValidInput}
        >Valider
      </button>
    </div>
    <div class="flex flex-auto" />
  </div>

  <table class="table table-zebra w-full">
    {#if isDay}
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nom</th>
          <th scope="col">Moyenne</th>
          <th scope="col">Meilleur</th>
          <th scope="col">Résultats</th>
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
            <td class="col word-spacing"
              >{R.join(" ", formatSolvesArray(solves))}
            </td>
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

<style>
  .word-spacing {
    word-spacing: 30px;
  }
</style>