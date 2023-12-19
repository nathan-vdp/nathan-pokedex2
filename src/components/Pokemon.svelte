<script>

  export let name;

//   const fetchPokemonData = async (name) => {
//   return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) =>
//     res.json()
//   );
// };

import { fetchPokemonData } from "../utils/fetchPokemonData";
import loadingGif from "../assets/loading.gif";

  let flavorText = "";
  import EvolutionChain from "./EvolutionChain.svelte";
  import Moves from "./Moves.svelte";

  let shinyToggle = false;

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

  fetchPokemonFlavorText(name);

  const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  function getTypeColor(typeName) {
    return typeColors[typeName] || "gray";
  }

  let data;

  // Reactive statement that fetches Pokémon data whenever name changes
  $: if (name) {
    fetchPokemonData(name).then(fetchedData => {
      data = fetchedData;
    });
  }


</script>


{#await fetchPokemonData(name)}
<div class="flex justify-center items-center">
  <img
    src={loadingGif}
    alt="loading"
    class="mt-10 w-72"
  />
</div>
{:then data}
<div class="text-center">
  <h1 class="mx-2">
    <span class="text-3xl font-bold">{name}</span>
    <span class="text-3xl text-slate-500 text-muted"
      >#{data.id.toString().padStart(4, "0")}</span
    >
    {#if data["sprites"]["other"]["official-artwork"]["front_shiny"]}
       <label class="relative inline-flex items-center cursor-pointer mx-2">
      <input on:click={() => (shinyToggle = !shinyToggle)} type="checkbox" value="" class="sr-only peer">
      <div class="w-11 me-2 h-6 bg-gray-200 peer-focus:outline-none   rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
      <span class="text-sm font-medium">Shiny</span>
    </label>
    {/if}

          <!-- <button on:click={() => (shinyToggle = !shinyToggle)}>
        Toggle Shiny
      </button> -->
  </h1>
  <div>
    <div class="flex justify-center">

      <img
      src={shinyToggle ? data["sprites"]["other"]["official-artwork"]["front_shiny"] : data["sprites"]["other"]["official-artwork"]["front_default"]}
      alt={data.name}
    />
    </div>
  </div>
    <div>
      <table class="table-auto">
        <thead class="bg-red-600">
          <th class="py-2 text-white" colspan="2"> General info </th>
        </thead>
        <tbody>
          <tr class="border border-slate-200">
            <td class="bg-slate-300 py-2 font-semibold">Name</td>
            <td class="bg-slate-100 py-2">{data.name}</td>
          </tr>
          <tr class="border border-slate-200">
            <td class="bg-slate-300 py-2 font-semibold">Type</td>
            <td class="bg-slate-100 py-2 text-white">
              {#each data.types as type}
                <span
                  class="px-3 py-1 rounded mx-1"
                  style="background-color: {getTypeColor(type)};"
                >
                  {type + " "}
                </span>
              {/each}
            </td>
          </tr>
          <tr class="border border-slate-200">
            <td class="bg-slate-300  py-2 font-semibold">Weight</td>
            <td class="bg-slate-100  py-2">
              {(data.weight * 0.1).toFixed(2) + " kg"}
            </td>
          </tr>
          <tr class="border border-slate-200">
            <td class="bg-slate-300  py-2 font-semibold">Height</td>
            <td class="bg-slate-100  py-2">
              {(data.height * 10).toFixed(2) + " cm"}
            </td>
          </tr>
        </tbody>
      </table>

      <table id="stats" class="mt-4 py-2 font-sans">
        <thead>
          <th class="text-center text-white py-2 bg-red-600" colspan="2"> Stats </th>
        </thead>
        <tbody>
          {#each data.stats as stat}
            <tr class="border border-slate-200 flex flex-col">
              <td class="bg-slate-300 py-2 font-semibold">{stat.stat.name}</td>
              <td class="bg-slate-100 py-2">
                <div class="group flex justify-center pt-3">
                  <div class="w-1/2 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-200">
                    <div
                      class="bg-blue-500 h-2.5 rounded-full transition-transform group-hover:scale-x-125"
                      style="width: {(stat.base_stat / 252) * 100}%"
                    ></div>
                  </div>
                  <div class="opacity-0 absolute bg-black text-white px-2 py-1 rounded-md group-hover:opacity-100 mt-5">
                    {stat.base_stat}
                  </div>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <table id="flavortext" class="my-4">
        <thead>
          <th class="text-center text-white py-2 bg-red-600" colspan="2">
            Description
          </th>
        </thead>
        <tbody>
          <tr class="border border-slate-200">
            <td class="bg-slate-100 p-5">{flavorText}</td>
          </tr>
        </tbody>
      </table>



      <!-- <table id="stats" class="mt-2">
        <tbody>
          <tr>
            <td class="bg-slate-300 px-20 py-2 font-semibold">Stats</td>
            <td class="bg-slate-100 px-32 py-2">
              {#each data.stats as stat}
                <div class="flex justify-between">
                  <div>{stat.stat.name}</div>
                  <div>{stat.base_stat}</div>
                </div>
              {/each}
            </td>
          </tr>
        </tbody>
      </table> -->
    </div>
  </div>


    <EvolutionChain pokemonId={data.id} />




  <div class="text-center my-2">
    <Moves {data} />
  </div>
{/await}

<!-- TODO: change pokemons in evolution chain to the card thingies in main page
 -->

<!-- <div class="flex flex-col justify-center items-center">
  {#await fetchPokemonData(name)}
    <p>Loading {name}....</p>
  {:then data}
    <img src={data.sprites.front_default} alt={data.name} class="w-52" />
    <h1 class="text-3xl font-bold m-2 text-slate-400">{name}</h1>
    <div class="flex flex-col md:flex-row">
      <div class="m-2">
        <h1 class="text-xl bg-slate-700 text-white rounded-md p-2 flex justify-center">Stats</h1>
        <div class="flex flex-col mt-5 bg-slate-700 rounded-md p-4">
          {#each data.stats as stat}
            <h2 class="text-slate-400">{stat.stat.name}: {stat.base_stat}</h2>
          {/each}
        </div>
      </div>
      <div class="m-2">
        <h1 class="text-xl bg-slate-700 text-white rounded-md p-2 flex justify-center">Types</h1>
        <div class="flex flex-col mt-4 bg-slate-700 rounded-md p-4">
          {#each data.types as type}
            <h2 class="text-slate-400">{type.type.name}</h2>
          {/each}
        </div>
      </div>
    </div>
  {/await}
</div> -->

<style>
  table,
  th,
  td,
  tr {
    border-left: none;
    border-right: none;
    text-align: center;
  }

  table {
    width: 100%;
  }
</style>
