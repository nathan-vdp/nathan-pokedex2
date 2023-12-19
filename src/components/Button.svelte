<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<button
  class="bg-red-600 text-white p-3 m-3 shadow-sm rounded-md hover:bg-red-500 hover:text-white-900"
  on:click={() => dispatch("changeOffset")}
>
  <slot />
</button>
