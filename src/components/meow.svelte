<script>
  let showKonamiModal = false;
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'];
  let konamiCodePosition = 0;

  function checkKonamiCode(e) {
    if (e.key === konamiCode[konamiCodePosition]) {
      konamiCodePosition++;
      if (konamiCodePosition === konamiCode.length) {
        showKonamiModal = true;
        konamiCodePosition = 0;
      }
    } else {
      konamiCodePosition = 0;
    }
  }
function closeModal() {
    showKonamiModal = false;
}

</script>
<svelte:window on:keydown={checkKonamiCode} />

{#if showKonamiModal}

<div class="fixed inset-0 z-50 overflow-auto" id="konamiModal">
    <div class="flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">Secret Unlocked!</h2>
        <div class="sites-embed-align-left-wrapping-off">
            <div class="sites-embed-border-off sites-embed" style="width:900px;">
                <div class="sites-embed-content sites-embed-type-ggs-gadget">
                    <iframe width="900" height="600" scrolling="no" frameborder="0" id="1754059280" name="1754059280" title="pokemon fire red" class="igm"
                        src="//mj89sp3sau2k7lj1eg3k40hkeppguj6j-a-sites-opensocial.googleusercontent.com/gadgets/ifr?url=http://www.gstatic.com/sites-gadgets/iframe/iframe.xml&amp;container=enterprise&amp;view=default&amp;lang=en&amp;country=ALL&amp;sanitize=0&amp;v=8be8763db9005d0&amp;libs=core&amp;parent=https://sites.google.com/site/solarunblockedgames/home/pokemon-red#up_scroll=auto&amp;up_iframeURL=https://mkgamesdev.github.io/MKGBA2.0/launcher.html%23pokemonred&amp;st=e%3DAIHE3cDvOYD9Z%252BikeREWzcwnDBcLURNdjiL7i0UPYP7hW4UxkNQjNPuDhVsCYcYmUfzq5m3kVLlGbxQRFEI7ASuNx5US5GtuA%252FRPgKLOVT1GNwZ8ZC8vuBerDqvKz4E5hs0ydMxt0W8Z%26c%3Denterprise&amp;rpctoken=-6596244589032334870">
                    </iframe>
                </div>
            </div>
        </div>
        <button id="closeModal" class="mt-4 bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-md" on:click={closeModal}>Close</button>
      </div>
    </div>
  </div>  
  {/if}