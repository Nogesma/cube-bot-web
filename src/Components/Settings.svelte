<script>
  import ColourSchemes from './ColourSchemes.svelte';
  import GeneralSettings from './GeneralSettings.svelte';

  export let settings;
</script>

<style>
  nav {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    background-color: rgba(255, 255, 255, 0.95);
    z-index: 1000;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05),
      inset 0 -1px 0 rgba(0, 0, 0, 0.15);
  }

  #TableOfContents {
    position: sticky;
    top: 5rem;
  }

  li {
    list-style: none;
    display: list-item;
    text-align: left;
    margin-bottom: 0.25rem;
  }
  ul {
    padding-left: 0;
  }
  ul ul {
    padding-left: 1rem;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
</style>

<nav class="py-2">
  <div class="container-xxl d-flex align-items-md-center">
    <span
      class="position-relative mr-auto navbar-brand mb-0 h1"
      style="display: inline-block; direction: ltr;">
      Settings</span>
    <div class="">
      <button
        class="btn btn-bd-light btn-close"
        data-display="static"
        on:click={() => (settings = false)} />
    </div>
  </div>
</nav>

<div class="container-xxl my-md-4 bd-layout">
  <div class="row">
    <div class="col-10">
      <GeneralSettings />
      <ColourSchemes />
    </div>
    <div class="col-2 bd-toc mt-4 mb-5 my-md-0 pl-xl-3 mb-lg-5 text-muted">
      <div id="TableOfContents">
        <strong class="d-block h6 pb-2 border-bottom">Contents</strong>
        <ul>
          <li><a href="#general">General</a></li>
          <li>
            <a href="#colour">Colour Schemes </a>
            <ul>
              <li><a href="#cube">Cubes</a></li>
              <li><a href="#pyra">Pyraminx</a></li>
              <li><a href="#mega">Megaminx</a></li>
              <li><a href="#sq1">Square-1</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
