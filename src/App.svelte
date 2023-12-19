<script>
  import "./global.css";
  import "./extraStyling/style.css"
  import { Route, Router } from "svelte-navigator";
  import Navbar from "./components/Navbar.svelte";
  import PokemonGrid from "./components/PokemonGrid.svelte";
  import Pokemon from "./components/Pokemon.svelte";
  import Meow from "./components/meow.svelte";

  let offset = 0;

  let limit = 151;

  let searchValue = "";

  let selectedType = "All types";

  // let offset = 0;

  // const increaseOffset = () => {
  //   offset += 20;
  // };

  // const decreaseOffset = () => {
  //   offset -= 20;
  // };
</script>

<Navbar bind:searchValue bind:offset bind:limit bind:selectedType />
<main class="flex flex-col justify-center items-center p-4">
  <Router>
    <Meow />
    <Route to="/">
      <div class="flex justify-center items-center w-fit">
      </div>
      <PokemonGrid {offset} {limit} {searchValue} {selectedType}/></Route
    >
    <Route path="/:name" let:params>
      <Pokemon name={params.name} />
    </Route>
  </Router>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
</style>
