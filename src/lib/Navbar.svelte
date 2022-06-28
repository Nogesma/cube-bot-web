<script lang="ts">
  import Cookies from "js-cookie";
  import { getAvatarUrl } from "../tools/utilities.js";

  export let login: boolean = false;
  import { push } from "svelte-spa-router";

  $: avatarUrl = login && getAvatarUrl(localStorage.avatar, localStorage.id);

  const logout = () => {
    localStorage.clear();
    Cookies.remove("token");
    window.history.replaceState({}, document.title, "/");
    location.reload();
  };
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a href="#/" class="btn btn-ghost normal-case text-xl">Cube Competitions</a>
  </div>
  {#if login}
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
          <li><button on:click={() => push("/settings")}>Settings</button></li>
          <li><button on:click={logout}>Logout</button></li>
        </ul>
      </div>
    </div>
  {/if}
</div>
