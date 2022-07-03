<script lang="ts">
  import { onMount } from "svelte";
  import { querystring, replace } from "svelte-spa-router";

  import axios from "axios";
  import Loading from "../../lib/Loading.svelte";
  import { isEmpty } from "ramda";
  import { login } from "../../stores/settings";
  const urlParams = new URLSearchParams($querystring ?? "");
  const code = urlParams.get("code");

  if (code && !isEmpty(code)) {
    onMount(() => postOauth(code));
  }

  const postOauth = async (c: string) =>
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URI}/api/oauth/discord/${c}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        localStorage.id = data.id;
        localStorage.username = data.username;
        localStorage.avatar = data.avatar;
        $login = true;
        window.history.replaceState({}, document.title, "/");
        replace("/");
      })
      .catch(() => {
        window.history.replaceState({}, document.title, "/");
        replace("/auth/login");
      });
</script>

<Loading />
