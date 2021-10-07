<script>
  import Cookies from 'js-cookie';
  import { currentEvent } from '../stores/times';
  import { events, pages } from '../data/config';
  import { getAvatarUrl } from '../tools/utilities';

  export let currentPage;
  export let login;

  const oauthUrl = `https://discord.com/api/oauth2/authorize?client_id=${
    process.env.CLIENT_ID
  }&redirect_uri=${encodeURIComponent(
    process.env.WEBSITE_URL
  )}&response_type=code&scope=guilds%20identify`;

  const avatarUrl = getAvatarUrl(localStorage.avatar, localStorage.id);
</script>

<nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
  <div class="container-fluid">
    <span
      class="navbar-brand mb-0 h1"
      on:click={() => (currentPage = pages.Dashboard)}
    >
      Cube Competitions
    </span>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <span
            class="nav-link {currentPage !== pages.Dashboard ? '' : 'active'}"
            on:click={() => (currentPage = pages.Dashboard)}>Menu</span
          >
        </li>
        <li class="nav-item">
          <span
            class="nav-link {currentPage === pages.Rankings ? 'active' : ''}"
            on:click={() => (currentPage = pages.Rankings)}>Classement</span
          >
        </li>
        <li class="nav-item">
          <span
            class="nav-link {currentPage === pages.Settings ? 'active' : ''}"
            on:click={() => (currentPage = pages.Settings)}>Réglages</span
          >
        </li>
      </ul>
      {#if login}
        {#if currentPage === pages.Timer}
          <span class="nav-item dropdown">
            <button
              class="btn btn-outline-light mr-2 dropdown-toggle"
              type="button"
              data-toggle="dropdown"
            >
              {$currentEvent}
            </button>
            <div class="dropdown-menu dropdown-menu-sm-right">
              <h6 class="dropdown-header">Event</h6>
              {#each events as e}
                {#if e !== $currentEvent}
                  <button
                    class="dropdown-item"
                    href="#"
                    on:click={() => currentEvent.set(e)}>{e}</button
                  >
                {/if}
              {/each}
            </div>
          </span>
        {/if}
        <span class="nav-item dropdown">
          <button
            class="btn btn-outline-light dropdown-toggle"
            type="button"
            data-toggle="dropdown"
          >
            {localStorage.username}
            <img
              src={avatarUrl}
              alt="discord avatar"
              height="25px"
              class="rounded-circle"
            />
          </button>
          <div class="dropdown-menu dropdown-menu-sm-right">
            <a
              class="dropdown-item text-reset text-decoration-none"
              href="/"
              on:click={() => {
                localStorage.clear();
                Cookies.remove('token');
              }}>Logout</a
            >
          </div>
        </span>
      {:else}
        <a class="btn btn-light text-reset text-decoration-none" href={oauthUrl}
          >Log in</a
        >
      {/if}
    </div>
  </div>
</nav>

<style>
  .dropdown-menu {
    z-index: 1100;
  }
</style>
