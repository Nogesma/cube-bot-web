<script lang="ts">
  import * as R from "ramda";
  import dayjs from "dayjs";
  import { events } from "../data/config.js";
  import { getAvatarUrl, formatSolvesArray } from "../tools/utilities.js";
  import axios from "axios";
  import { isEmpty } from "ramda";

  let rankEvent: string;
  let dayOrMonth: string;
  let isDay = true;
  let stringDate = dayjs().format("YYYY-MM-DD");

  const fetchRankings = async () =>
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URI
        }/api/rankings/${dayOrMonth}/${rankEvent}/${formattedDate}/`,
        { withCredentials: true }
      )
      .then(({ data }) => data)
      .catch(() => []);

  const handleSubmit = async () => {
    isDay = dayOrMonth === "day";
    formattedDate = isDay ? date.format("YYYY-MM-DD") : date.format("YYYY-MM");
    rankings = isDay
      ? ((await fetchRankings()) as DailyRankings[])
      : ((await fetchRankings()) as MonthlyRankings[]);
  };

  interface DailyRankings {
    author: string;
    solves: string[];
    average: string;
    single: string;
    avatar: string;
    username: string;
  }

  interface MonthlyRankings {
    author: string;
    score: string;
    attendances: string;
    avatar: string;
    username: string;
  }

  type Ranks = MonthlyRankings | DailyRankings;

  let rankings: Ranks[] = [];
  $: date = dayjs(stringDate);
  $: isValidDate = date.isValid();
  $: isValidInput =
    rankEvent !== "Event" && dayOrMonth !== "Jour/Mois" && isValidDate;

  let formattedDate: string;

  const isDailyRankings = (r: Ranks[]): r is DailyRankings[] =>
    !isEmpty(r) && !!(r as DailyRankings[])[0].single;

  const isMonthlyRankings = (r: Ranks[]): r is MonthlyRankings[] =>
    !isEmpty(r) && !!(r as MonthlyRankings[])[0].score;
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
    {#if isDailyRankings(rankings)}
      <thead>
        <tr>
          <th>#</th>
          <th>Nom</th>
          <th>Moyenne</th>
          <th>Meilleur</th>
          <th>Résultats</th>
        </tr>
      </thead>
      <tbody>
        {#each rankings as { author, solves, average, single, avatar, username }, i}
          <tr>
            <th>{i + 1}</th>
            <td>
              <div class="flex content-center">
                <div class="avatar pr-5">
                  <div class="w-10 rounded-full">
                    <img
                      src={getAvatarUrl(String(avatar), author)}
                      alt="discord avatar"
                      height="25px"
                      class="rounded-circle"
                    />
                  </div>
                </div>
                <div class="flex place-items-center">
                  {username}
                </div>
              </div>
            </td>
            <td>{average}</td>
            <td>{single}</td>
            <td class="word-spacing"
              >{R.join(" ", formatSolvesArray(solves))}
            </td>
          </tr>
        {/each}
      </tbody>
    {:else if isMonthlyRankings(rankings)}
      <thead>
        <tr>
          <th>#</th>
          <th>Nom</th>
          <th>Points</th>
          <th>Participations</th>
        </tr>
      </thead>
      <tbody>
        {#each rankings as { author, score, attendances, avatar, username }, i}
          <tr>
            <th>{i + 1}</th>
            <td>
              <div class="flex content-center">
                <div class="avatar pr-5">
                  <div class="w-10 rounded-full">
                    <img
                      src={getAvatarUrl(String(avatar), author)}
                      alt="discord avatar"
                      height="25px"
                      class="rounded-circle"
                    />
                  </div>
                </div>
                <div class="flex place-items-center">
                  {username}
                </div>
              </div>
            </td>
            <td>{score}</td>
            <td>{attendances}</td>
          </tr>
        {/each}
      </tbody>
    {:else}
      <thead>
        <tr>
          <th class="text-center">Classement vide</th>
        </tr>
      </thead>
    {/if}
  </table>
</div>

<style>
  .word-spacing {
    word-spacing: 30px;
  }
</style>
