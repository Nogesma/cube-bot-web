<script lang="ts">
  import Cookies from "js-cookie";
  import { getAvatarUrl } from "../tools/utilities.js";
  import { login } from "../stores/settings";
  import { push } from "svelte-spa-router";
  let avatarUrl: string;

  $: $login && (avatarUrl = getAvatarUrl(localStorage.avatar, localStorage.id));

  const logout = () => {
    localStorage.clear();
    Cookies.remove("token");
    window.history.replaceState({}, document.title, "/");
    location.reload();
  };
</script>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    <a href="/#" class="btn btn-ghost normal-case text-xl">Cube Competitions</a>
  </div>
	
	<div class="navbar-end">
	
    <a
      href="#/rankings"
      class="btn btn-ghost normal-case text-xl hidden lg:flex">Classement</a
    >
    <a
      href="#/settings"
      class="btn btn-ghost normal-case text-xl hidden lg:flex">Réglages</a
    >
    {#if $login}
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <div tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img alt="discord profile" src={avatarUrl} />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button class="lg:hidden" on:click={() => push("/rankings")}
                >Classement</button
              >
            </li>
            <li>
              <button class="lg:hidden" on:click={() => push("/settings")}
                >Réglages</button
              >
            </li>
            <li><button on:click={logout}>Déconnexion</button></li>
          </ul>
        </div>
      </div>
    {/if}
  </div>
</div>
