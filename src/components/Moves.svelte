<script>
  import { compute_rest_props } from "svelte/internal";
  import { writable } from "svelte/store";

  export let data;

  let movesData = writable([]);

  $: totalPages = Math.ceil($movesData.length / movesPerPage);

  let currentPage = writable(1);
  const movesPerPage = 10;

  $: if (data && data.moves) {
    const movesPromises = data.moves.map(async (move) => {
      const response = await fetch(move.move.url);
      const moveData = await response.json();
      return moveData;
    });
    Promise.all(movesPromises).then((fetchedMovesData) => {
      movesData.set(fetchedMovesData);
    });
  }

  function nextPage() {
    $currentPage++;
  }

  function previousPage() {
    if ($currentPage > 1) {
      $currentPage--;
    }
  }
</script>

<div>
  {#if $currentPage > 1}
    <button
      class="bg-red-500 text-white rounded-full p-3"
      on:click={previousPage}>Previous</button
    >
  {/if}
  {#if $currentPage < totalPages}
    <button class="bg-red-500 text-white rounded-full p-3" on:click={nextPage}
      >Next</button
    >
  {/if}
</div>

<table class="min-w-full mt-2">
  <thead>
    <tr class="bg-red-600 text-white">
      <th class="px-4 py-2">Name</th>
      <th class="hidden md:table-cell px-4 py-2">Type</th>
      <th class="hidden md:table-cell px-4 py-2">Category</th>
      <th class="px-4 py-2">Power</th>
      <th class="px-4 py-2">Accuracy</th>
      <th class="px-4 py-2">PP</th>
      <th class="hidden md:table-cell px-4 py-2">Description</th>
    </tr>
  </thead>
  <tbody class="">
    {#each $movesData.slice(($currentPage - 1) * movesPerPage, $currentPage * movesPerPage) as move (move.id)}
      <tr class="">
        <td class="border border-slate-200 px-4 py-2 bg-slate-300"
          >{move.name}</td
        >
        <td class="hidden md:table-cell border border-slate-200 px-4  py-2 bg-slate-100"
          >{move.type.name}</td
        >
        <td class="hidden md:table-cell border border-slate-200 px-4  py-2 bg-slate-100"
          >{move.damage_class.name}</td
        >
        {#if move.power}
          <td class="border border-slate-200 px-4 py-2 bg-slate-100"
            >{move.power}</td
          >
        {:else}
          <td class="border border-slate-200 px-4 py-2 bg-slate-100">-</td>
        {/if}
        {#if move.accuracy}
          <td class="border border-slate-200 px-4 py-2 bg-slate-100"
            >{move.accuracy}</td
          >
        {:else}
          <td class="border border-slate-200 px-4 py-2 bg-slate-100">-</td>
          {/if}
          {#if move.pp}
            <td class="border border-slate-200 px-4 py-2 bg-slate-100"
              >{move.pp}</td
            >
          {:else}
            <td class="border border-slate-200 px-4 py-2 bg-slate-100">-</td>
          
        {/if}

        <td
          title={move.effect_entries[0].effect}
          class="hidden md:table-cell border border-slate-200 px-4  py-2 bg-slate-100"
          >{move.effect_entries[0].short_effect}</td
        >
      </tr>
    {/each}
  </tbody>
</table>
