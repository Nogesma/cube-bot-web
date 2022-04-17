<script>
  import Navbar from './Components/Navbar.svelte';
  import Warning from './Components/Warning.svelte';
  import Login from './Components/Login.svelte';
  import Dashboard from './Components/Dashboard.svelte';
  import Solve from './Components/Solve.svelte';
  import Loading from './Components/Loading.svelte';
  import Rankings from './Components/Rankings.svelte';

  import Settings from './Components/Settings.svelte';
  import { pages } from './data/config';

  const urlParams = new URLSearchParams(window.location.search);
  let currentPage = pages.Dashboard;

  const discordAuth = async () =>
    fetch(`/api/oauth/discord/${urlParams.get('code')}`)
      .then((res) => res.json())
      .then((res) => {
        localStorage.id = res.id;
        localStorage.username = res.username;
        localStorage.avatar = res.avatar;
      })
      .then(() => (window.location.search = ''));

  const loading = urlParams.has('code');
  if (loading) discordAuth();
  const isRedirect = urlParams.has('redirect');
</script>

{#if loading}
  <Loading />
{:else}
  {#if isRedirect}
    <Warning />
  {/if}
  {#await fetch(`/api/ping`).then((res) => res.ok) then isLoggedIn}
    {#if isLoggedIn}
      <Navbar bind:currentPage login={true} />
      {#if currentPage === pages.Dashboard}
        <Dashboard bind:currentPage />
      {:else if currentPage === pages.Timer}
        <Solve />
      {:else if currentPage === pages.Settings}
        <Settings />
      {:else if currentPage === pages.Rankings}
        <Rankings />
      {/if}
    {:else}
      <Navbar bind:currentPage login={false} />
      <Login />
    {/if}
  {/await}
{/if}
