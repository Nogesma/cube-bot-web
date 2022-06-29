<script lang="ts">
  const oauthUrl = `https://discord.com/api/oauth2/authorize?client_id=${
    import.meta.env.VITE_CLIENT_ID
  }&redirect_uri=${encodeURIComponent(
    import.meta.env.VITE_REDIRECT_URI
  )}&response_type=code&scope=guilds%20identify`;
</script>

<div class="hero min-h-screen">
  <div class="hero-content text-center">
    <div>
      <h1 class="text-5xl font-bold pb-40">
        Connectez vous avec discord pour continuer
      </h1>
      <a class="btn btn-active btn-primary btn-lg" href={oauthUrl}>Connexion</a>
    </div>
  </div>
</div>
