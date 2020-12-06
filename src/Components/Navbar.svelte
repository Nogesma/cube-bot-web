<script>
  import Cookies from 'js-cookie';
  import * as R from 'ramda';

  import { currentEvent } from '../stores/times';
  import { events } from '../data/config';

  export let settings;
  const returnHome = () => {
    currentEvent.set('');
    settings = false;
  };

  const oauthUrl =
    'https://discord.com/api/oauth2/authorize?client_id=476105820929654796&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&response_type=code&scope=guilds%20identify';

  const avatarUrl = `https://cdn.discordapp.com/${R.equals(1, R.length(localStorage.avatar)) ? `embed/avatars/${localStorage.avatar}` : `avatars/${localStorage.id}/${localStorage.avatar}`}${R.test(/^a_/, localStorage.avatar) ? '.gif' : '.png'}`
</script>

<style>
  .dropdown-menu {
    z-index: 1100;
  }
</style>

<nav class="navbar navbar-expand-sm navbar-dark bg-dark ">
  <div class="container-fluid">
    <span class="navbar-brand mb-0 h1" on:click={returnHome}>
      Cube Competitions
    </span>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText">
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <!--      <ul class="navbar-nav mr-auto mb-2 mb-lg-0">-->
      <!--        <li class="nav-item">Home</li>-->
      <!--        <li class="nav-item">Timer</li>-->
      <!--      </ul>-->
      <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <span
            class="nav-link {$currentEvent ? '' : 'active'}"
            on:click={returnHome}>Home</span>
        </li>
        <li class="nav-item">
          <span
            class="nav-link {$currentEvent ? 'active' : 'disabled'}"
            on:click={() => (settings = false)}>Timer</span>
        </li>
      </ul>
      {#if Cookies.get('token')}
        {#if $currentEvent}
          <span class="nav-item dropdown">
            <button
              class="btn btn-outline-light mr-2 dropdown-toggle"
              type="button"
              data-toggle="dropdown">
              {$currentEvent}
            </button>
            <div class="dropdown-menu dropdown-menu-sm-right">
              <h6 class="dropdown-header">Event</h6>
              {#each events as e}
                {#if e !== $currentEvent}
                  <button
                    class="dropdown-item"
                    href="#"
                    on:click={() => currentEvent.set(e)}>{e}</button>
                {/if}
              {/each}
            </div>
          </span>
        {/if}
        <span class="nav-item dropdown">
          <button
            class="btn btn-outline-light dropdown-toggle"
            type="button"
            data-toggle="dropdown">
            {localStorage.username}
            <img
              src={avatarUrl}
              alt="discord avatar"
              height="25px"
              class="rounded-circle" />
          </button>
          <div class="dropdown-menu dropdown-menu-sm-right">
            <span
              class="dropdown-item text-reset text-decoration-none"
              on:click={() => (settings = true)}>Settings</span>
            <a
              class="dropdown-item text-reset text-decoration-none"
              href="/"
              on:click={() => {
                localStorage.clear();
                Cookies.remove('token');
              }}>Logout</a>
          </div>
        </span>
      {:else}
        <a
          class="btn btn-light text-reset text-decoration-none"
          href={oauthUrl}>Log in</a>
      {/if}
    </div>
  </div>
</nav>
