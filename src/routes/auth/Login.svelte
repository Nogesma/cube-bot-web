<script lang="ts">
  const oauthUrl = `https://discord.com/api/oauth2/authorize?client_id=${
    import.meta.env.VITE_CLIENT_ID
  }&redirect_uri=${encodeURIComponent(
    import.meta.env.VITE_REDIRECT_URI
  )}&response_type=code&scope=guilds%20identify`;
</script>

<h1>Log in</h1>

<a href={oauthUrl}>Click me!</a>
