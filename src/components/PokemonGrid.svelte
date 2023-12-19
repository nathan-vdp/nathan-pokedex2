<script>
  import { Link } from "svelte-navigator";

  import { fetchPokemonData } from "../utils/fetchPokemonData";

  import loadingGif from '../assets/loading.gif';


  export let offset;
  export let limit;
  export let searchValue;

  let pokemons = [];
  let filteredPokemons = [];

  $: fetchPokemons = async () => {
    return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`) // TODO: FIX OFFSET!!!!11!11!!1
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        pokemons = data.results;
        return data.results;
      });
  };

  $: {
    filteredPokemons = searchValue
      ? pokemons.filter(pokemon => pokemon.name.includes(searchValue))
      : pokemons;
  }

  let flavorText = "";

  async function fetchPokemonFlavorText(pokemonName) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
    );
    const data = await response.json();
    const flavorTextEntry = data.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    if (flavorTextEntry) {
      let rawFlavorText = flavorTextEntry.flavor_text;
      flavorText = rawFlavorText
        .replace("\f", "\n")
        .replace("\u00ad\n", "")
        .replace("\u00ad", "")
        .replace(" -\n", " - ")
        .replace("-\n", "-")
        .replace("\n", " ");
    } else {
      flavorText = "No flavor text found";
    }
  }
</script>

{#await fetchPokemons()}

{:then}
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-10 my-8"
  >
    {#each filteredPokemons as pokemon}
      {#await fetchPokemonData(pokemon.name)}
      <div
      style="height: 400px"
      class="relative bg-white rounded-lg shadow-lg flex flex-col justify-between items-center overflow-hidden group"
      >
      <img
        src={loadingGif}
        alt="loading"
        class="w-72"
      />
      <div
        class="absolute w-full h-full flex flex-col justify-between transform translate-y-3/4 p-4 bg-red-600 text-center text-white transition-all duration-700 ease-in-out group-hover:translate-y-0"
      >
        <h1 class="text-2xl font-bold capitalize mt-4">
          {pokemon.name}
        </h1>
        <div class="flex-grow flex items-center justify-center">
          <p class="w-8/12 m-auto">
            {flavorText}
          </p>
        </div>
      </div>
      </div>
      {:then data}
        <Link to={`/${pokemon.name}`}>
          <div
            style="height: 400px"
            class="relative bg-white rounded-lg shadow-lg flex flex-col justify-between items-center overflow-hidden group"
          >
            <img
              on:mouseenter={() => fetchPokemonFlavorText(pokemon.name)}
              src={data["sprites"]["other"]["official-artwork"][
                "front_default"
              ]}
              alt={pokemon.name}
              class="w-72"
            />
            <div
              class="absolute w-full h-full flex flex-col justify-between transform translate-y-3/4 p-4 bg-red-600 text-center text-white transition-all duration-700 ease-in-out group-hover:translate-y-0"
            >
              <h1 class="text-2xl font-bold capitalize mt-4">
                {pokemon.name}
              </h1>
              <div class="flex-grow flex items-center justify-center">
                <p class="w-8/12 m-auto">
                  {flavorText}
                </p>
              </div>
            </div>
          </div>
        </Link>
      {/await}
    {/each}
  </div>
{/await}
