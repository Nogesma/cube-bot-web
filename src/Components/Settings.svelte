<script>
  import ColourSchemes from './ColourSchemes.svelte';
  import GeneralSettings from './GeneralSettings.svelte';
</script>

<div class="container-xxl my-md-4 bd-layout">
  <div class="row">
    <div class="col-10">
      <GeneralSettings />
      <br />
      <ColourSchemes />
    </div>
    <div class="col-2 bd-toc mt-4 mb-5 my-md-0 pl-xl-3 mb-lg-5 text-muted">
      <div id="TableOfContents">
        <strong class="d-block h6 pb-2 border-bottom">Contents</strong>
        <ul>
          <li><a href="#general">Général</a></li>
          <li>
            <a href="#colour">Colour Schemes</a>
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

<style>
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
