<script>
  // import { Link } from "svelte-navigator";
  export let searchValue = "";

  function handleInput(event) {
    searchValue = event.target.value.toLowerCase();
  }

  let generations = [
    { name: "All generations", offest: 0, limit: 1017 },
    { name: "Gen 1", offset: 0, limit: 151 },
    { name: "Gen 2", offset: 151, limit: 100 },
    { name: "Gen 3", offset: 251, limit: 135 },
    { name: "Gen 4", offset: 386, limit: 107 },
    { name: "Gen 5", offset: 493, limit: 156 },
    { name: "Gen 6", offset: 649, limit: 72 },
    { name: "Gen 7", offset: 721, limit: 88 },
    { name: "Gen 8", offset: 809, limit: 96 },
    { name: "Gen 9", offset: 905, limit: 112 },
  ];
  let selectedGeneration = generations[0];

  let types = [
    "All types",
    "Normal",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dark",
    "Dragon",
    "Steel",
    "Fairy",
  ];

  export let selectedType = types[0];
  export let offset = selectedGeneration.offset;
  export let limit = selectedGeneration.limit;

  $: {
    offset = selectedGeneration.offset;
    limit = selectedGeneration.limit;
  }

  $: {
    console.log(selectedType);
  }
</script>

<nav>
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl font-bold whitespace-nowrap dark:text-black text-black ml-4">Pokedex</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden focus:outline-none" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="text-gray-300 ml-2 font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
        <li>
          <select class="rounded-md h-9 bg-transparent w-50 mb-3 text-black ml-6 border-none" bind:value={selectedGeneration}>
      {#each generations as generation (generation.name)}
        <option value={generation}>{generation.name}</option>
      {/each}
    </select>
        </li>
        <li>
          <select class="rounded-md h-9 bg-transparent w-50 mb-3 text-black ml-6 border-none" bind:value={selectedType}>
          {#each types as type}
          <option value={type}>{type}</option>
        {/each}
      </select>
        </li>
        <li>
          <input class="text-center font-light h-10 w-52 ml-5 rounded-md focus:outline-none" type="text" placeholder="Search Pokémon" on:input={handleInput} bind:value={searchValue} />
      </ul>
    </div>
  </div>
</nav>











<!-- Back up navbar -->
<!-- <nav
  class="flex justify-between items-center rounded-md p-4 w-full text-slate-900 font-bold text-xl"
>
  <div>
    <Link to="/">Pokedex</Link>
  </div>

  <div class="items-center">
    <select
      id="color"
      class="rounded-md h-9 bg-transparent w-50 md:inline-block"
      bind:value={selectedGeneration}
    >
      {#each generations as generation (generation.name)}
        <option value={generation}>{generation.name}</option>
      {/each}
    </select>
    <input
      class="text-center font-light h-10 w-24 ml-5 rounded-md focus:outline-none border-2 focus:border-red-500"
      type="text"
      placeholder="Search"
      on:input={handleInput}
      bind:value={searchValue}
    />
  </div>
</nav> -->