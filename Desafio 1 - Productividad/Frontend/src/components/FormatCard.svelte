<script>
  let { format, onclick, disabled = false } = $props();
</script>

<button
  {onclick}
  {disabled}
  aria-label={format.name}
  class="relative w-full p-6 border-2 border-gray-100 rounded-2xl bg-white shadow-sm hover:border-pink-400 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200 text-left group {disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}"
>
  <div class="flex items-center gap-3 mb-2">
    <span class="inline-block w-3 h-3 rounded-full bg-pink-400 animate-pulse"></span>
    <span class="text-2xl font-bold text-gray-800 group-hover:text-pink-500 transition-colors">{format.name}</span>
  </div>
  <div class="text-base text-gray-600 mb-4 break-words leading-relaxed">
    {format.prompt}
  </div>
  <div class="flex items-center gap-2 text-xs text-pink-700 bg-pink-50 p-3 rounded-lg group-hover:bg-pink-100 transition-colors">
    <span class="text-lg">💡</span>
    <span><strong>Tips:</strong> {format.tips}</span>
  </div>
  {#if disabled}
    <div class="absolute inset-0 bg-white bg-opacity-60 rounded-2xl flex items-center justify-center pointer-events-none">
      <span class="text-pink-400 font-semibold text-sm">No disponible</span>
    </div>
  {/if}
</button>
