<script>
  import Navbar from './Components/Navbar.svelte';
  import Login from './Components/Login.svelte';
  import Dashboard from './Components/Dashboard.svelte';
  import Solve from './Components/Solve.svelte';
  import Loading from './Components/Loading.svelte';

  import { currentEvent } from './stores/times';
  import Settings from './Components/Settings.svelte';

  const urlParams = new URLSearchParams(window.location.search);
  let settings = false;
  const discordAuth = async () =>
    fetch(`/api/oauth/discord/${urlParams.get('code')}`)
      .then((res) => res.json())
      .then((res) => {
        if (!res.userInGuild) {
        }
        localStorage.id = res.id;
        localStorage.username = res.username;
        localStorage.avatar = res.avatar;
      })
      .then(() => (window.location.search = ''));

  const loading = urlParams.has('code');
  if (loading) discordAuth();
</script>

{#if loading}
  <Loading />
{:else}
  <Navbar bind:settings />
  {#await fetch(`/api/ping`).then((res) => res.ok) then isLoggedIn}
    {#if isLoggedIn}
      {#if settings}
        <Settings bind:settings />
      {:else if $currentEvent}
        <Solve />
      {:else}
        <Dashboard />
      {/if}
    {:else}
      <Login />
    {/if}
  {/await}
{/if}
