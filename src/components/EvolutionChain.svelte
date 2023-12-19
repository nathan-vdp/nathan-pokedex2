<script>
  export let pokemonId; // Declare a prop for the Pokémon ID
  let evoCount = 0; // Declare a variable for the evolution count

  async function fetchEvolutionChain(pokemonId) {
    // Fetch the Pokémon species
    const speciesResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
    );
    const speciesData = await speciesResponse.json();

    // Get the evolution chain URL from the species data
    const evolutionChainUrl = speciesData.evolution_chain.url;

    // Fetch the evolution chain data
    const evolutionResponse = await fetch(evolutionChainUrl);
    const evolutionData = await evolutionResponse.json();

    // Return the evolution chain data
    return evolutionData.chain;
  }

  async function renderEvolutionChain(chain) {
    // Fetch the Pokémon data
    const pokemonResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${chain.species.name}`
    );
    const pokemonData = await pokemonResponse.json();

    // Get the image URL from the Pokémon data
    const imageUrl =
      pokemonData["sprites"]["other"]["official-artwork"]["front_default"];

    //   let html = `
    // <a href="/${chain.species.name}">
    //   <div
    //     style="height: 400px"
    //     class="relative bg-white rounded-lg shadow-lg flex flex-col justify-between items-center overflow-hidden group"
    //   >
    //     <img
    //       src=${imageUrl}
    //       alt=${chain.species.name}
    //       class="w-72"
    //     />
    //     <div
    //       class="absolute w-full h-full flex flex-col justify-between transform translate-y-3/4 p-4 bg-red-600 text-center text-white"
    //     >
    //       <h1 class="text-2xl font-bold capitalize mt-4">
    //         ${chain.species.name}
    //       </h1>
    //       <div class="flex-grow flex items-center justify-center">
    //         <p class="w-8/12 m-auto">
    //           ${chain.species.name}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </a>`;

    let html2 = `
<a href="/${chain.species.name}">
  <div
    style="height: 400px"
    class="relative bg-white rounded-lg shadow-lg flex flex-col justify-between items-center overflow-hidden group"
  >
    <img
      src=${imageUrl}
      alt=${chain.species.name}
      class="w-72"
    />
    <div
      class="absolute w-full h-full flex flex-col justify-between translate-y-3/4 p-4 bg-red-600 text-center text-white"
    >
      <h1 class="text-2xl font-bold capitalize mt-4">
        ${chain.species.name}
      </h1>
    </div>
  </div>
</a>`;

evoCount++;
{console.log(evoCount)}

  let evolutionsHtml = [];
  for (const evo of chain.evolves_to) {
    evolutionsHtml.push(await renderEvolutionChain(evo));
  }

  return [html2, ...evolutionsHtml].join('');
}

  let evolutionChainHtml = "";

  $: if (pokemonId) {
    // Use the pokemonId prop here
    fetchEvolutionChain(pokemonId).then((evolutionChain) => {
      renderEvolutionChain(evolutionChain).then((html) => {
        evolutionChainHtml = html;
      });
    });
  }
</script>

{#if evolutionChainHtml === ""}
  <p>Loading evolution chain...</p>
{:else}
  {#if evoCount === 1}
    <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-10 my-8">
      {@html evolutionChainHtml}
    </div>
  {:else if evoCount === 2}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 my-8">
      {@html evolutionChainHtml}
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 my-8">
      {@html evolutionChainHtml}
    </div>
  {/if}
{/if}
